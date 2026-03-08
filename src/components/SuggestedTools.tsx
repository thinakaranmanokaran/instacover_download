import { Download, Eye, Film } from "lucide-react";

const tools = [
  { icon: Film, title: "Instagram Video Downloader", desc: "Save any Instagram video in HD quality" },
  { icon: Download, title: "Instagram Story Downloader", desc: "Download stories before they disappear" },
  { icon: Eye, title: "Instagram Profile Picture Viewer", desc: "View and download full-size profile pictures" },
];

const SuggestedTools = () => (
  <section className="w-full max-w-3xl mx-auto mt-16 mb-8">
    <h2 className="text-lg font-semibold text-foreground mb-4">More Tools</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <button
          key={tool.title}
          className="group text-left p-5 rounded-xl border border-border bg-card shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer"
        >
          <tool.icon className="w-5 h-5 text-ig-pink mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-sm font-semibold text-foreground mb-1">{tool.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
        </button>
      ))}
    </div>
  </section>
);

export default SuggestedTools;
