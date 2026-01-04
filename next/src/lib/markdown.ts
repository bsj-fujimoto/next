import matter from "gray-matter";
import { ComponentMetadata, ComponentVariation } from "@/types/component";
import fs from "fs";
import path from "path";

export interface ComponentMarkdown {
  metadata: ComponentMetadata;
  content: string;
  codeSample?: string;
  variations?: ComponentVariation[];
}

/**
 * Markdownファイルをパースして、メタデータとコンテンツを抽出
 */
export function parseComponentMarkdown(markdown: string): ComponentMarkdown {
  const { data, content } = matter(markdown);

  // コードサンプルとバリエーションを抽出
  // エスケープされたバッククォート（\`\`\`）と通常のバッククォート（```）の両方に対応
  const codeSamplePattern = /## コードサンプル\s+(?:\\?`){3}(\w+)?\n([\s\S]*?)(?:\\?`){3}/;
  const codeSampleMatch = content.match(codeSamplePattern);
  const codeSample = codeSampleMatch && codeSampleMatch[2] ? codeSampleMatch[2].trim() : undefined;

  // バリエーションセクションを抽出
  const variationsMatch = content.match(/## バリエーション\s+([\s\S]*)/);
  const variations: ComponentVariation[] = [];
  
  if (variationsMatch) {
    const variationsContent = variationsMatch[1];
    // バリエーションのパターン: ### タイトル、説明、コードブロック
    const variationRegex = /### (.+?)\s+([\s\S]*?)(?:\\?`){3}(\w+)?\n([\s\S]*?)(?:\\?`){3}/g;
    let match;
    
    while ((match = variationRegex.exec(variationsContent)) !== null) {
      variations.push({
        name: match[1].trim(),
        description: match[2].trim(),
        code: match[4] ? match[4].trim() : "",
      });
    }
  }

  return {
    metadata: {
      title: data.title || "",
      description: data.description || "",
      icon: data.icon || null,
      previewComponent: data.previewComponent || null,
      previewProps: data.previewProps || {},
    },
    content,
    codeSample,
    variations,
  };
}

/**
 * コンポーネントIDからMarkdownファイルを読み込む（サーバーサイドのみ）
 */
export function loadComponentMarkdown(componentId: string): ComponentMarkdown | null {
  try {
    const filePath = path.join(process.cwd(), "docs/components", `${componentId}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return parseComponentMarkdown(fileContents);
  } catch (error) {
    console.error(`Failed to load markdown for ${componentId}:`, error);
    return null;
  }
}

/**
 * すべてのコンポーネントMarkdownファイルを読み込む（サーバーサイドのみ）
 */
export function loadAllComponentMarkdowns(): Map<string, ComponentMarkdown> {
  const markdowns = new Map<string, ComponentMarkdown>();
  const docsDir = path.join(process.cwd(), "docs/components");
  
  try {
    const files = fs.readdirSync(docsDir);
    for (const file of files) {
      if (file.endsWith(".md")) {
        const componentId = file.replace(".md", "");
        const markdown = loadComponentMarkdown(componentId);
        if (markdown) {
          markdowns.set(componentId, markdown);
        }
      }
    }
  } catch (error) {
    console.error("Failed to load component markdowns:", error);
  }
  
  return markdowns;
}
