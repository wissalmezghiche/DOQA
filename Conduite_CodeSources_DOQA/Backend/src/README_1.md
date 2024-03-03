# Running Llama 2 and other Open-Source LLMs on CPU Inference Locally for Document Q&A


___
## Files and Content
- `/Projet_CPRJ\Llama-2-Open-Source-LLM-CPU-Inference`: The main folder
- `/config`: Configuration files for LLM application cotnaining its parameters and hyperparameters
- `/data`: Dataset used for this project in PDF format
- `/models`: Binary file of GGML quantized LLM model (i.e., Llama-2-7B-Chat) 
- `/src`: Python codes of key components of LLM application, namely `llm.py`, `utils.py`, and `prompts.py`
- `/vectorstore`: FAISS vector store for documents
- `db_build.py`: Python script to ingest dataset and generate FAISS vector store
- `main.py`: Main Python script to launch the application and to pass user query via command line
- `pyproject.toml`: TOML file to specify which versions of the dependencies used (Poetry)
- `requirements.txt`: List of Python dependencies (and version)
___

## References
Special credit given to the author of the reposiroty of the quantisized llama model : <b> Kenneth Leung</b>
- https://github.com/marella/ctransformers
- https://huggingface.co/TheBloke
- https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGML
- https://python.langchain.com/en/latest/integrations/ctransformers.html
- https://python.langchain.com/en/latest/modules/models/llms/integrations/ctransformers.html
- https://python.langchain.com/docs/ecosystem/integrations/ctransformers
- https://ggml.ai
- https://github.com/rustformers/llm/blob/main/crates/ggml/README.md
- https://www.mdpi.com/2189676
