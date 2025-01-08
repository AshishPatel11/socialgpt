// app/api/langflow/route.js

import { NextResponse } from "next/server";

class LangflowClient {
    constructor(baseURL, applicationToken) {
        this.baseURL = baseURL;
        this.applicationToken = applicationToken;
    }
    async post(
        endpoint,
        body,
        headers = { "Content-Type": "application/json" }
    ) {
        headers["Authorization"] = `Bearer ${this.applicationToken}`;
        headers["Content-Type"] = "application/json";
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            });

            const responseMessage = await response.json();
            if (!response.ok) {
                throw new Error(
                    `${response.status} ${
                        response.statusText
                    } - ${JSON.stringify(responseMessage)}`
                );
            }
            return responseMessage;
        } catch (error) {
            console.error("Request Error:", error.message);
            throw error;
        }
    }

    async initiateSession(
        flowId,
        langflowId,
        inputValue,
        inputType = "chat",
        outputType = "chat",
        stream = false,
        tweaks = {}
    ) {
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
        return this.post(endpoint, {
            input_value: inputValue,
            input_type: inputType,
            output_type: outputType,
            tweaks: tweaks,
        });
    }

    handleStream(streamUrl, onUpdate, onClose, onError) {
        const eventSource = new EventSource(streamUrl);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onUpdate(data);
        };

        eventSource.onerror = (event) => {
            console.error("Stream Error:", event);
            onError(event);
            eventSource.close();
        };

        eventSource.addEventListener("close", () => {
            onClose("Stream closed");
            eventSource.close();
        });

        return eventSource;
    }

    async runFlow(
        flowIdOrName,
        langflowId,
        inputValue,
        inputType = "chat",
        outputType = "chat",
        tweaks = {},
        stream = false,
        onUpdate,
        onClose,
        onError
    ) {
        try {
            const initResponse = await this.initiateSession(
                flowIdOrName,
                langflowId,
                inputValue,
                inputType,
                outputType,
                stream,
                tweaks
            );
            console.log("Init Response:", initResponse);
            if (
                stream &&
                initResponse &&
                initResponse.outputs &&
                initResponse.outputs[0].outputs[0].artifacts.stream_url
            ) {
                const streamUrl =
                    initResponse.outputs[0].outputs[0].artifacts.stream_url;
                console.log(`Streaming from: ${streamUrl}`);
                this.handleStream(streamUrl, onUpdate, onClose, onError);
            }
            return initResponse;
        } catch (error) {
            console.error("Error running flow:", error);
            onError("Error initiating session");
        }
    }
}

const flowIdOrName = "6ca33a09-8674-4a65-a052-3d500e6afbef";
const langflowId = "92012475-ebb9-4e06-a5a8-ef1f57809e82";
const applicationToken = process.env.APPLICATION_TOKEN;
const tweaks = {
    "ChatInput-AKp0S": {
        background_color: "",
        chat_icon: "",
        files: "",
        // input_value: "What is the document is about?",
        sender: "User",
        sender_name: "User",
        session_id: "",
        should_store_message: true,
        text_color: "",
    },
    "ParseData-6KyZ1": {
        sep: "\n",
        template: "{text}",
    },
    "Prompt-QIXnx": {
        context: "",
        question: "",
        template:
            "{context}\n\n---\n\nYou are a AI powered chat bot assistant to analyze the social media data. Answer the question as best as possible.\n\nQuestion: {question}\n\nAnswer: ",
    },
    "SplitText-vNQ5C": {
        chunk_overlap: 200,
        chunk_size: 1024,
        separator: "},",
    },
    "ChatOutput-41nG6": {
        background_color: "",
        chat_icon: "",
        data_template: "{text}",
        input_value: "",
        sender: "Machine",
        sender_name: "AI",
        session_id: "",
        should_store_message: true,
        text_color: "",
    },
    "AstraDB-3OVWa": {
        advanced_search_filter: "{}",
        api_endpoint:
            "https://2bab0390-c5ea-4c44-bee9-057b1af27014-us-east-2.apps.astra.datastax.com",
        batch_size: null,
        bulk_delete_concurrency: null,
        bulk_insert_batch_concurrency: null,
        bulk_insert_overwrite_concurrency: null,
        collection_indexing_policy: "",
        collection_name: "mock3",
        embedding_choice: "Embedding Model",
        keyspace: "",
        metadata_indexing_exclude: "",
        metadata_indexing_include: "",
        metric: "cosine",
        number_of_results: 4,
        pre_delete_collection: false,
        search_filter: {},
        search_input: "",
        search_score_threshold: 0,
        search_type: "Similarity",
        setup_mode: "Sync",
        token: "ASTRA_DB_APPLICATION_TOKEN",
    },
    "AstraDB-P7sfC": {
        advanced_search_filter: "{}",
        api_endpoint:
            "https://2bab0390-c5ea-4c44-bee9-057b1af27014-us-east-2.apps.astra.datastax.com",
        batch_size: null,
        bulk_delete_concurrency: null,
        bulk_insert_batch_concurrency: null,
        bulk_insert_overwrite_concurrency: null,
        collection_indexing_policy: "",
        collection_name: "mock3",
        embedding_choice: "Embedding Model",
        keyspace: "",
        metadata_indexing_exclude: "",
        metadata_indexing_include: "",
        metric: "cosine",
        number_of_results: 4,
        pre_delete_collection: false,
        search_filter: {},
        search_input: "",
        search_score_threshold: 0,
        search_type: "Similarity",
        setup_mode: "Sync",
        token: "ASTRA_DB_APPLICATION_TOKEN",
    },
    "File-FK8dy": {
        concurrency_multithreading: 4,
        path: "mock_data.json",
        silent_errors: false,
        use_multithreading: false,
    },
    "HuggingFaceInferenceAPIEmbeddings-YWM28": {
        api_key: "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",
        inference_endpoint:
            "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
        model_name: "sentence-transformers/all-MiniLM-L6-v2",
    },
    "HuggingFaceInferenceAPIEmbeddings-Cl4SI": {
        api_key: "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",
        inference_endpoint: "https://api-inference.huggingface.co/models/",
        model_name: "BAAI/bge-large-en-v1.5",
    },
    "HuggingFaceInferenceAPIEmbeddings-em3qi": {
        api_key: "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",
        inference_endpoint: "https://api-inference.huggingface.co/models/",
        model_name: "BAAI/bge-large-en-v1.5",
    },
    "GroqModel-RY6FZ": {
        groq_api_base: "https://api.groq.com",
        groq_api_key:
            "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",
        input_value: "",
        max_tokens: null,
        model_name: "llama-3.1-8b-instant",
        n: null,
        stream: false,
        system_message: "",
        temperature: 0.1,
    },
};
const langflowClient = new LangflowClient(
    "https://api.langflow.astra.datastax.com",
    applicationToken
);

export async function POST(req) {
    try {
        const {
            inputValue,
            inputType = "chat",
            outputType = "chat",
            stream = false,
        } = await req.json();

        const response = await langflowClient.runFlow(
            flowIdOrName,
            langflowId,
            inputValue,
            inputType,
            outputType,
            tweaks,
            stream,
            (data) => {
                console.log("Stream Data:", data);
            }, // onUpdate
            (message) => {
                console.log("Stream closed", message);
            }, // onClose
            (error) => {
                console.error("Stream error", error);
            }
        );
        console.log(response);
        if (!stream && response && response.outputs) {
            const flowOutputs = response.outputs[0];
            const firstComponentOutputs = flowOutputs.outputs[0];
            const output = firstComponentOutputs.outputs.message;
            return NextResponse.json({ result: output.message.text });
        }
        //if stream is true but does not return value
        return NextResponse.json({ result: "Streaming..." });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
