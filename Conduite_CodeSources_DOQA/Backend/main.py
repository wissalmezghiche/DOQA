import PIL
from fastapi import FastAPI, UploadFile, File, HTTPException
from transformers import pipeline
import os
from pdf2image import convert_from_path
from fastapi.middleware.cors import CORSMiddleware
from typing import List


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
def pdf_to_images(pdf_path):
    images = convert_from_path(pdf_path, 300)
    return images

model_name = 'impira/layoutlm-document-qa'
qa_pipeline = pipeline('document-question-answering', model=model_name)
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg"}
def convert_pdf_to_image(pdf_path):
    images = convert_from_path(pdf_path)
    # Assuming you want to use the first page of the PDF
    return images[0]
def convert_to_images(file_path: str) -> List['PIL.Image.Image']:
    _, file_extension = os.path.splitext(file_path)
    
    if file_extension.lower() == '.pdf':
        # Convert PDF to images
        images = convert_from_path(file_path)
        return images
    elif file_extension.lower() in ['.png', '.jpg', '.jpeg']:
        # Open PNG, JPG, or JPEG image directly
        return [PIL.Image.open(file_path)]
    else:
        raise HTTPException(status_code=400, detail="Unsupported file format")
def allowed_file(filename):
    file_extension = filename.rsplit(".", 1)[1].lower()
    print(f"File extension: {file_extension}")
    return "." in filename and file_extension in ALLOWED_EXTENSIONS

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    print(file.filename)
    if not allowed_file('.'+file.filename):
        raise HTTPException(status_code=400, detail="Only PDF, PNG, JPG, and JPEG files are allowed for uploading.")
    file_content = await file.read()
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    
    with open(file_path, "wb") as new_file:
        new_file.write(file_content)
    
    return {"filename": file.filename, "size_of_file": len(file_content), "stored_path": file_path}


@app.post("/ask/")
async def ask_question(file_path: str, question: str, answer_count: int = 1):
    try:
        # Convert to images based on file format
        images = convert_to_images(file_path)
        
        # Process the question on each image
        all_answers = []
        for i, image in enumerate(images):
            processed_answer = qa_pipeline(image=image, question=f"{question} (Page {i + 1})")
            all_answers.extend(processed_answer)
        
        sorted_answers = sorted(all_answers, key=lambda x: x['score'], reverse=True)
        
        # Select the top N answers
        selected_answers = sorted_answers[:answer_count]
        
        return {"question": question, "answers": selected_answers}
    except Exception as e:
        return {"error": str(e)}