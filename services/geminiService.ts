import { GoogleGenAI, Type } from "@google/genai";
import type { TabloidContent } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    mainTitle: { type: Type.STRING, description: "手抄报的主标题，应响亮、醒目，富有创意。例如：强国有我，青春无悔。" },
    subtitle: { type: Type.STRING, description: "手抄报的副标题，对主标题进行补充。例如：庆祝建军节，致敬最可爱的人。" },
    introduction: {
        type: Type.OBJECT,
        description: "卷首语或前言部分，简短精炼，引人入胜。",
        properties: {
            title: { type: Type.STRING, description: "该板块的标题，例如：卷首语" },
            content: { type: Type.STRING, description: "卷首语的具体内容，大约100字。" }
        }
    },
    mainArticle: {
        type: Type.OBJECT,
        description: "手抄报的核心文章，阐述阅兵的意义和“强国有我”的内涵。",
        properties: {
            title: { type: Type.STRING, description: "核心文章的标题。例如：铁血军魂，国之重器" },
            content: { type: Type.STRING, description: "核心文章的具体内容，大约200-300字，语言要适合初三学生。" }
        }
    },
    poem: {
        type: Type.OBJECT,
        description: "一首原创的、与主题相关的现代诗。",
        properties: {
            title: { type: Type.STRING, description: "诗歌的标题。" },
            author: { type: Type.STRING, description: "诗歌的作者，可以署名'一位爱国的少年'。" },
            content: { type: Type.ARRAY, items: { type: Type.STRING }, description: "诗歌的内容，按诗句分段。" }
        }
    },
    slogans: {
        type: Type.OBJECT,
        description: "一些朗朗上口的宣传口号。",
        properties: {
            title: { type: Type.STRING, description: "该板块的标题，例如：青春誓言" },
            items: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-5条简短有力的口号。" }
        }
    },
    knowledgeCorner: {
        type: Type.OBJECT,
        description: "一个知识小栏目，介绍与阅兵或国防相关的一个有趣知识点。",
        properties: {
            title: { type: Type.STRING, description: "知识栏目的标题，例如：国防小百科" },
            content: { type: Type.STRING, description: "知识点的具体内容，大约100字。" }
        }
    },
    illustrationIdeas: {
        type: Type.OBJECT,
        description: "提供一些简单的、适合手绘的插图创意。",
        properties: {
            title: { type: Type.STRING, description: "该板块的标题，例如：创意插画角" },
            items: { 
                type: Type.ARRAY, 
                items: {
                    type: Type.OBJECT,
                    properties: {
                        description: { type: Type.STRING, description: "插图创意的具体文字描述。" },
                        svgPath: { type: Type.STRING, description: "一个与插画描述内容高度相关、能够被清晰识别的简笔画SVG路径数据 (d属性的值)。请务必确保生成的图像是具体的、可识别的，而不是抽象的线条。风格应为极简图标风格（Minimalist Icon Style），线条干净且有意义。路径应在100x100的视口中绘制。例如，对于'和平鸽'，一个好的路径应该是能清晰勾勒出鸽子轮廓的线条，如 'M50 10 C 20 20, 20 60, 50 90 C 80 60, 80 20, 50 10 Z'。最终的图像必须能让初中生一眼就看懂它所描绘的对象。" }
                    },
                    required: ["description", "svgPath"]
                },
                description: "1条插画创意描述及对应的极简图标风格SVG路径。例如：描述是'一只和平鸽衔着橄榄枝飞过天安门'，同时生成一个匹配的、清晰可辨的SVG路径。" 
            }
        }
    },
  },
  required: ["mainTitle", "subtitle", "introduction", "mainArticle", "poem", "slogans", "knowledgeCorner", "illustrationIdeas"]
};

export const generateTabloidContent = async (): Promise<TabloidContent> => {
  const prompt = `
  请你扮演一位资深的青少年教育专家和内容创作者，为一名即将面临中考的初三学生，创作一份关于“强国有我”主题的国庆阅兵手抄报内容。
  内容需要积极向上、富有感染力，并能激发学生的历史责任感和民族自豪感。
  语言风格需兼顾初三学生的认知深度与青春活力，可以适当引用一些历史典故或名人名言，并巧妙地将'强国有我'的主题与学生的个人成长、历史责任和未来梦想联系起来。
  核心文章部分可以更有深度，不仅描述阅兵的壮观，更要引导学生思考其背后的国家实力、科技进步和民族精神。
  对于插画创意，请务必同时生成一个匹配该创意的、清晰可辨的极简图标风格SVG路径数据。
  请严格按照我提供的JSON schema格式返回内容，不要有任何多余的解释或说明。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedContent = JSON.parse(jsonText) as TabloidContent;
    
    return parsedContent;

  } catch (error) {
    console.error("Error during content generation pipeline:", error);
    
    const errorContent = error instanceof Error ? error.message : JSON.stringify(error);
    const lowerErrorContent = errorContent.toLowerCase();

    if (lowerErrorContent.includes('429') || lowerErrorContent.includes('quota') || lowerErrorContent.includes('resource_exhausted')) {
      throw new Error("AI服务当前请求过多，已超出使用额度。请稍后再试。");
    }

    throw new Error("AI内容生成失败，可能是网络问题或API配置错误。");
  }
};