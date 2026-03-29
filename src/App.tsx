/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ExternalLink, 
  ArrowUpRight,
  Cpu,
  Zap,
  Clock,
  Database,
  Code2
} from "lucide-react";

const ProjectItem = ({ 
  title, 
  description, 
  tags, 
  link, 
  details 
}: { 
  title: string, 
  description: string, 
  tags: string[], 
  link?: string,
  details?: React.ReactNode
}) => (
  <div className="project-card">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-2xl font-bold">{title}</h3>
      {link && (
        <a href={link} target="_blank" rel="noreferrer" className="text-muted hover:text-black transition-colors">
          <ArrowUpRight size={20} />
        </a>
      )}
    </div>
    <div className="flex gap-2 mb-4">
      {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
    </div>
    <p className="text-muted text-lg mb-6 leading-relaxed">
      {description}
    </p>
    {details && (
      <div className="mt-8 space-y-6">
        {details}
      </div>
    )}
  </div>
);

const TechBadge = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center gap-3 py-2 border-b border-slate-50">
    <Icon size={16} className="text-muted" />
    <span className="text-xs font-bold uppercase tracking-wider w-24 shrink-0">{label}</span>
    <span className="text-sm text-muted">{value}</span>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen py-24">
      <div className="container-narrow">
        {/* Header */}
        <header className="mb-24">
          <h1 className="text-4xl font-black mb-4">Developer Portfolio</h1>
          <p className="text-xl text-muted max-w-lg">
            AI 엔지니어링과 고속 프로토타이핑에 특화된 풀스택 개발자입니다. 
            기술의 핵심을 파악하고 실질적인 솔루션을 구축합니다.
          </p>
        </header>

        {/* Projects Section */}
        <section className="mb-24">
          <span className="section-label">Selected Projects</span>
          
          <div className="space-y-12">
            {/* Project: Tax-Free */}
            <ProjectItem 
              title="Tax-Free"
              description="개인사업자와 프리랜서를 위한 AI 세무 비서. 국세청 데이터를 학습한 RAG 기반 지능형 상담 시스템입니다."
              tags={["AI", "RAG", "Full-stack", "Hackathon"]}
              link="https://tax-free.vercel.app/"
              details={
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <span className="section-label !text-[10px]">Technical Achievement</span>
                      <div className="space-y-1">
                        <TechBadge icon={Zap} label="Build Time" value="5 Hours (Cursor Hackathon)" />
                        <TechBadge icon={Cpu} label="AI Model" value="GPT-4o + Responses API" />
                        <TechBadge icon={Database} label="Data" value="NTS Guide Vectorization" />
                        <TechBadge icon={Code2} label="Stack" value="React, OpenAI, RAG" />
                      </div>
                    </div>
                    <div>
                      <span className="section-label !text-[10px]">AI Implementation</span>
                      <p className="text-sm text-muted leading-relaxed mb-4">
                        단순 챗봇을 넘어 국세청 PDF 자료를 텍스트로 추출, 임베딩하여 벡터 스토어를 구축했습니다. 
                        사용자 질문에 가장 적합한 세무 지식을 검색하여 답변에 주입하는 RAG 파이프라인을 설계했습니다.
                      </p>
                      <div className="code-block mono text-[11px] text-slate-500">
                        {`// RAG Pipeline Summary
const context = await vectorStore.search(query);
const response = await openai.generate({
  context: context,
  prompt: query
});`}
                      </div>
                    </div>
                  </div>
                </div>
              }
            />

            {/* Placeholder for other projects */}
            <ProjectItem 
              title="Next Project"
              description="준비 중인 다음 프로젝트입니다. AI와 사용자 경험의 결합을 탐구하고 있습니다."
              tags={["Upcoming"]}
            />
          </div>
        </section>

        {/* Skills / About */}
        <section className="mb-24">
          <span className="section-label">Technical Focus</span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-2">AI Engineering</h4>
              <p className="text-sm text-muted">RAG, Prompt Engineering, Vector DB, LLM Integration</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Frontend</h4>
              <p className="text-sm text-muted">React, Next.js, TypeScript, Tailwind CSS</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Backend</h4>
              <p className="text-sm text-muted">Node.js, Express, PostgreSQL, Firebase</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-line flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-muted">© 2026 Portfolio</span>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-muted transition-colors">Email</a>
            <a href="#" className="hover:text-muted transition-colors">GitHub</a>
            <a href="#" className="hover:text-muted transition-colors">LinkedIn</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
