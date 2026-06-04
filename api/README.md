To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000

## System Workflow

![System Workflow](workflow.png)

```mermaid
graph TD
    A[Repo URL Pasted] --> B[Workers]
    
    subgraph Workers
        B --> W1[Worker 1: Metadata Worker]
        B --> W2[Worker 2: Clone Worker]
        B --> W3[Worker 3: Scanner Worker]
        
        W1_Tasks["- Verify Repo Exists<br>- Fetch owner<br>- Fetch name<br>- Fetch stars<br>- Fetch languages<br>- Fetch default branch"]
        W2_Tasks["- Clone Repo<br>- Store local path"]
        W3_Tasks["- Walk filesystem<br>- Count files<br>- Build tree<br>- Ignore files like .git, node_modules etc"]
        
        W1 --> W1_Tasks
        W2 --> W2_Tasks
        W3 --> W3_Tasks
        
        W1_Tasks --> W2_Tasks
        W2_Tasks --> W3_Tasks
    end

    Workers --> C[LLM and intelligence pipeline]
    
    subgraph LLM and Intelligence Pipeline
        C --> CW[Chunk Worker]
        C --> FW[File Worker]
        C --> EW[Embedding Worker]
        
        CW_Tasks["- Split file into logical chunks<br>- Add metadata<br>- Store chunks"]
        FW_Tasks["- Read important files<br>- Generate file level summaries via LLM<br>- Extract exports, functions, classes etc"]
        EW_Tasks["- Generate embedding for chunks<br>- Store in vector DB"]
        
        CW --> CW_Tasks
        FW --> FW_Tasks
        EW --> EW_Tasks
    end
```

### Process Description

1. **Repo URL Pasted**: The workflow begins when a user submits a GitHub repository URL.
2. **Workers Pipeline**:
    - **Metadata Worker (Worker 1)**: Verifies that the repository exists, and fetches metadata including owner, repository name, stars count, programming languages, and the default branch.
    - **Clone Worker (Worker 2)**: Once metadata is verified, it clones the repository to the local system and saves the path.
    - **Scanner Worker (Worker 3)**: Walks the repository filesystem to build the directory tree, count files, and filter out ignored directories/files such as `.git` and `node_modules`.
3. **LLM and Intelligence Pipeline**:
    - **Chunk Worker**: Splits repository files into logical text chunks, attaches metadata to each chunk, and stores them.
    - **File Worker**: Reads key files, uses LLMs to generate file-level summaries, and extracts codebase elements like exports, functions, and classes.
    - **Embedding Worker**: Computes vector embeddings for the chunks and saves them in the vector database.
