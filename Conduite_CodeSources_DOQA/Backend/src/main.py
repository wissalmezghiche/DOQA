from transformers import AutoTokenizer, AutoModelForDocumentQuestionAnswering

MODEL_ID: str = "impira/layoutlm-document-qa"
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
model = AutoModelForDocumentQuestionAnswering.from_pretrained(MODEL_ID)
