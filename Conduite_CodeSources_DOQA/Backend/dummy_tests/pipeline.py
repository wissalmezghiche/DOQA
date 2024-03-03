'''
!pip install transformers
!pip install pytesseract
!pip install Pillow

!apt install tesseract-ocr
!apt install libtesseract-dev

'''
from transformers import pipeline
img_path = r"\images\architecture.png"
model_cpts =  {'layoutlm' : 'impira/layoutlm-document-qa'}   

pipeline = pipeline('document-question-answering', model= model_cpts['layoutlm'])
question = 'what are the different steps of the input representation of bert ?'
ans = pipeline(image=img_path, question =question)
print(f'The question : {question} \n The answer : {ans}')