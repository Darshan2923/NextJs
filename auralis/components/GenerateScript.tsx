import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GenerateScriptProps {
    setScript: (script: string) => void;
}

const GenerateScript = ({ setScript }: GenerateScriptProps) => {
    const [topic, setTopic] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const generateScript = useAction(api.openai.generateScriptAction);

    const handleGenerateScript = async () => {
        setIsGenerating(true);
        try {
            const script = await generateScript({ topic });
            setScript(script);
        } catch (error) {
            console.error("Error generating script:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic for the podcast script"
            />
            <Button onClick={handleGenerateScript} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Script"}
            </Button>
        </div>
    );
};

export default GenerateScript;