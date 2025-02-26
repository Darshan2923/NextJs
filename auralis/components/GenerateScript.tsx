// import { useState } from "react";
// import { useAction } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "./ui/label";
// import { Textarea } from "./ui/textarea";
// import { Loader } from "lucide-react";

// interface GenerateScriptProps {
//     setScript: (script: string) => void;
// }

// const GenerateScript = ({ setScript }: GenerateScriptProps) => {
//     const [topic, setTopic] = useState("");
//     const [isGenerating, setIsGenerating] = useState(false);
//     const generateScript = useAction(api.openai.generateScriptAction);

//     const handleGenerateScript = async () => {
//         setIsGenerating(true);
//         try {
//             const script = await generateScript({ topic });
//             setScript(script);
//         } catch (error) {
//             console.error("Error generating script:", error);
//         } finally {
//             setIsGenerating(false);
//         }
//     };

//     return (
//         <>
//             <div className="flex flex-col gap-2.5">
//                 <Label className='text-16 font-bold text-white-1'> Enter a topic for the podcast script</Label>
//                 <Input onChange={(e) => setTopic(e.target.value)} value={topic} className='input-class font-light focus-visible:ring-offset-blue-1' placeholder='Provide text to generate script' />

//             </div>
//             <div className="mt-5 mb-5 w-full max-w-[200px]">
//                 <Button type="submit" className="text-16 bg-blue-1 py-4 font-bold text-white-1" disabled={isGenerating} onClick={handleGenerateScript}>
//                     {isGenerating ? (
//                         <>
//                             Generating
//                             <Loader size={20} className="animate-spin ml-2" />
//                         </>
//                     ) : (
//                         'Generate'
//                     )}
//                 </Button>
//             </div>
//         </>
//     );
// };

// export default GenerateScript;