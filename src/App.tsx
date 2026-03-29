/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ExternalLink, 
  ArrowUpRight,
  Cpu,
  Zap,
  Clock,
  Database,
  Code2,
  Mail,
  Github,
  Phone,
  Shield,
  Users,
  FileText,
  Wrench
} from "lucide-react";

const ProjectItem = ({ 
  title, 
  description, 
  tags, 
  link, 
  github,
  details,
  period,
  participants,
  image
}: { 
  title: string, 
  description: string, 
  tags: string[], 
  link?: string,
  github?: string,
  details?: React.ReactNode,
  period?: string,
  participants?: string,
  image?: string
}) => (
  <article className="project-card">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-2xl font-bold">{title}</h3>
      <div className="flex items-center gap-6">
        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted hover:text-black transition-colors p-3 -m-3" aria-label={`사용해보기: ${title}`}>
            <span>사용해보기</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted hover:text-black transition-colors p-3 -m-3" aria-label={`GitHub: ${title}`}>
            <span>GitHub</span>
            <Github size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
    <div className="flex flex-col gap-3 mb-6">
      {(period || participants) && (
        <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-muted">
          {period && (
            <div className="flex items-center gap-1.5">
              <Clock size={12} aria-hidden="true" />
              <span>{period}</span>
            </div>
          )}
          {participants && (
            <div className="flex items-center gap-1.5">
              <Users size={12} aria-hidden="true" />
              <span>{participants}</span>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
      </div>
    </div>
    
    <p className="text-muted text-lg mb-6 leading-relaxed">
      {description}
    </p>
    {details && (
      <div className="mt-8 space-y-6">
        {details}
      </div>
    )}
    
    {image && (
      <div className="mt-8 rounded-xl overflow-hidden border border-line bg-slate-50">
        <img 
          src={image} 
          alt={`${title} 프로젝트 스크린샷`} 
          className="w-full h-auto block"
          referrerPolicy="no-referrer"
        />
      </div>
    )}
  </article>
);

const TechBadge = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center gap-3 py-2 border-b border-slate-100">
    <Icon size={16} className="text-muted" aria-hidden="true" />
    <span className="text-xs font-bold uppercase tracking-wider w-24 shrink-0">{label}</span>
    <span className="text-sm text-muted">{value}</span>
  </div>
);

const SideNav = () => {
  const [activeId, setActiveId] = useState("");
  
  const sections = [
    { id: "header", label: "Intro" },
    { id: "projects", label: "01 Projects" },
    { id: "tax-free", label: "Tax-Free", indent: true },
    { id: "moitz", label: "Moitz", indent: true },
    { id: "moitz-prompt", label: "Deep Dive 01", indent: true, sub: true },
    { id: "moitz-deep-1", label: "Deep Dive 02", indent: true, sub: true },
    { id: "moitz-deep-3", label: "Deep Dive 03", indent: true, sub: true },
    { id: "moitz-deep-4", label: "Deep Dive 04", indent: true, sub: true },
    { id: "moitz-deep-5", label: "Deep Dive 05", indent: true, sub: true },
    { id: "tools", label: "02 Tools" },
    { id: "skills", label: "03 Tech Stack" },
    { id: "experience", label: "04 Experience" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Find all elements corresponding to sections
      const sectionElements = sections
        .map((s) => ({
          id: s.id,
          el: document.getElementById(s.id),
        }))
        .filter((s) => s.el !== null);

      // The threshold should be slightly more than the scroll-margin-top (50px)
      // to ensure the section is considered "active" when it hits the target scroll position.
      const threshold = 250; 
      let currentActiveId = sections[0].id;

      // Find the section that currently covers the threshold line.
      // We iterate backwards to find the most specific (nested) section first.
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        const rect = section.el!.getBoundingClientRect();
        
        // A section is active if its top has passed the threshold
        if (rect.top <= threshold) {
          currentActiveId = section.id;
          break;
        }
      }

      setActiveId(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav aria-label="Side navigation" className="fixed left-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-50 w-48">
      <div className="flex flex-col gap-3">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`group flex items-center gap-3 transition-all duration-300 py-3 px-1 ${
              activeId === s.id 
                ? "text-black translate-x-2" 
                : "text-muted hover:text-slate-800"
            } ${s.indent ? (s.sub ? "ml-8" : "ml-4") : ""}`}
            onClick={(e) => {
              // The scroll listener will handle the active state update
            }}
          >
            <div className={`h-1 w-1 rounded-full bg-current transition-all duration-300 ${
              activeId === s.id ? "scale-150" : "scale-0"
            }`} aria-hidden="true" />
            <span className={`font-black uppercase tracking-[0.2em] whitespace-nowrap ${
              s.sub ? "text-[10px]" : "text-[12px]"
            }`}>
              {s.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default function App() {
  return (
    <div className="min-h-screen py-24 relative">
      <SideNav />
      <main className="container-narrow">
        {/* Header */}
        <header id="header" className="mb-24 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-xl">
            <h1 className="text-4xl font-black mb-4">육새라</h1>
            <p className="text-xl text-muted">
              AI 엔지니어링과 고속 프로토타이핑에 특화된 개발자입니다.<br />
              기술의 핵심을 파악하고 실질적인 솔루션을 구축합니다.
            </p>
          </div>
          
          {/* Vertical Contact Points */}
          <div className="flex flex-col gap-4 pt-2 shrink-0">
            <a href="mailto:yook.saera@gmail.com" className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-black transition-colors group p-2 -m-2">
              <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center group-hover:border-black transition-colors">
                <Mail size={14} className="text-muted group-hover:text-black" aria-hidden="true" />
              </div>
              <span>Email</span>
            </a>
            <a href="https://github.com/saera-yook" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-black transition-colors group p-2 -m-2">
              <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center group-hover:border-black transition-colors">
                <Github size={14} className="text-muted group-hover:text-black" aria-hidden="true" />
              </div>
              <span>GitHub</span>
            </a>
            <a href="tel:+821055503527" className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-black transition-colors group p-2 -m-2">
              <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center group-hover:border-black transition-colors">
                <Phone size={14} className="text-muted group-hover:text-black" aria-hidden="true" />
              </div>
              <span>Contact</span>
            </a>
          </div>
        </header>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <div className="section-label">
            <span className="opacity-70">01 /</span>
            <span>Projects</span>
          </div>
          
          <div className="space-y-12">
            {/* Project: Tax-Free */}
            <div id="tax-free">
              <ProjectItem 
                title="Tax-Free"
                description="개인사업자와 프리랜서를 위한 AI 세무 비서. 국세청의 '2025년 세금절약가이드'를 학습한 RAG 기반 지능형 상담 시스템입니다."
                tags={["AI", "RAG", "Next.js 14", "OpenAI Assistants", "TypeScript"]}
                link="https://tax-free.vercel.app/"
                github="https://github.com/saera-yook"
                period="2026.02 (1일)"
                participants="팀 프로젝트 (2인)"
              details={
                <div className="space-y-8">
                  <div className="rounded-xl overflow-hidden border border-line bg-slate-50">
                    <img 
                      src="/tax-free.png" 
                      alt="Tax-Free 프로젝트 스크린샷 (상단 배치 버전)" 
                      className="w-full h-auto block"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <span className="section-label !text-[14px]">Technical Achievement</span>
                      <div className="space-y-1">
                        <TechBadge icon={Zap} label="Build Time" value="5 Hours (Cursor Hackathon)" />
                        <TechBadge icon={Cpu} label="AI Model" value="GPT-4o + Assistants API" />
                        <TechBadge icon={Database} label="Knowledge" value="2025 NTS Tax Guide (PDF)" />
                        <TechBadge icon={Code2} label="Stack" value="Next.js 14, Vector Stores" />
                      </div>
                    </div>
                    <div>
                      <span className="section-label !text-[14px]">AI Implementation</span>
                      <p className="text-sm text-muted leading-relaxed mb-4">
                        국세청 공식 가이드 PDF를 OpenAI Vector Store에 업로드하고, Assistants API의 Retrieval 도구를 활용해 
                        법적 근거가 확실한 세무 상담 파이프라인을 구축했습니다. 
                        `setup-vector-store.ts` 스크립트를 통해 데이터 전처리 및 임베딩 과정을 자동화했습니다.
                      </p>
                      <div className="code-block mono text-[11px] text-slate-600 whitespace-pre-wrap">
                        {`// OpenAI Vector Store Setup
const vectorStore = await openai.beta.vectorStores.create({
  name: "Tax-Free Knowledge Base"
});

await openai.beta.vectorStores.files.create(vectorStore.id, {
  file_id: taxGuidePdfId
});`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            />
          </div>

            {/* Project: Moitz */}
            <div id="moitz">
              <ProjectItem 
                title="Moitz (모잇지)"
                description="모임 멤버들의 출발지와 목적을 기반으로 지리적 중간 지점을 계산하고, LLM 기반 AI 추천을 통해 최적의 장소를 큐레이션하는 서비스입니다."
                tags={["AI/LLM", "Java", "Spring Boot", "MongoDB", "AWS", "Docker", "Nginx", "GitHub Actions", "CloudWatch"]}
                link="https://moitz.kr/"
                github="https://github.com/woowacourse-teams/2025-moitz/tree/be-prod"
                period="2025.07 - 2025.11 (5개월)"
                participants="팀 프로젝트 (BE 4인, FE 2인)"
              details={
                <div className="space-y-16 mt-12">
                  <div className="rounded-2xl overflow-hidden border border-line bg-slate-50 mb-16">
                    <img 
                      src="/moitz_poster.png" 
                      alt="Moitz 프로젝트 포스터" 
                      className="w-full h-auto block"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-16">
                    {/* Engineering Impact */}
                    <div>
                      <span className="section-label !text-[14px] mb-8 block">Engineering Impact</span>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 py-3 border-b border-slate-100">
                          <Cpu size={18} className="text-slate-900" aria-hidden="true" />
                          <span className="text-xs font-black uppercase tracking-widest w-32 shrink-0">AI Model</span>
                          <span className="text-sm text-slate-600">Gemini (Main) / Perplexity (Fallback)</span>
                        </div>
                        <div className="flex items-center gap-4 py-3 border-b border-slate-100">
                          <Zap size={18} className="text-slate-900" aria-hidden="true" />
                          <span className="text-xs font-black uppercase tracking-widest w-32 shrink-0">Algorithm</span>
                          <span className="text-sm text-slate-600">Dijkstra (19s → 20ms)</span>
                        </div>
                        <div className="flex items-center gap-4 py-3 border-b border-slate-100">
                          <Shield size={18} className="text-slate-900" aria-hidden="true" />
                          <span className="text-xs font-black uppercase tracking-widest w-32 shrink-0">Reliability</span>
                          <span className="text-sm text-slate-600">Circuit Breaker / Fallback</span>
                        </div>
                        <div className="flex items-center gap-4 py-3 border-b border-slate-100">
                          <Code2 size={18} className="text-slate-900" aria-hidden="true" />
                          <span className="text-xs font-black uppercase tracking-widest w-32 shrink-0">Infra</span>
                          <span className="text-sm text-slate-600">AWS Blue-Green / VPC</span>
                        </div>
                      </div>
                      <div className="mt-10">
                        <a href="https://github.com/woowacourse-teams/2025-moitz/tree/be-prod" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:opacity-70 transition-opacity p-2 -m-2">
                          <Github size={14} aria-hidden="true" />
                          <span>View Source (Backend)</span>
                        </a>
                      </div>
                    </div>

                    {/* Key Contributions */}
                    <div>
                      <span className="section-label !text-[14px] mb-8 block">Key Contributions</span>
                      <ul className="space-y-6 text-[15px] text-slate-600 leading-relaxed">
                        <li className="flex gap-3">
                          <span className="text-slate-900 font-bold">•</span>
                          <span><strong>LLM 기반 장소 추천 엔진을 구축하고</strong>, Gemini(메인)와 Perplexity(폴백)를 연동하여 외부 API 장애 시에도 중단 없는 AI 추천 기능을 보장했습니다.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-slate-900 font-bold">•</span>
                          <span>외부 API 의존성을 제거하고 <strong>614개 역 데이터를 기반으로 지하철 최단 경로 알고리즘(Dijkstra)을 직접 구현</strong>하여 성능을 99.9% 개선했습니다.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-slate-900 font-bold">•</span>
                          <span>RestTemplate에서 <strong>WebClient 비동기 병렬 처리</strong>로 전환하여 외부 API 호출 응답 시간을 96% 단축했습니다.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-slate-900 font-bold">•</span>
                          <span><strong>Resilience4j 서킷 브레이커</strong>를 도입하여 외부 API 장애 시에도 서비스 연속성을 확보하고 Fallback 전략을 구축했습니다.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 
                  <div className="grid md:grid-cols-2 gap-16">
                    <div>
                      <span className="section-label !text-[14px] mb-8 block">Engineering Impact</span>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 py-3 border-b border-slate-100">
                          <Cpu size={18} className="text-slate-900" aria-hidden="true" />
                          <span className="text-xs font-black uppercase tracking-widest w-32 shrink-0">AI Model</span>
                          <span className="text-sm text-slate-600">Gemini (Main) / Perplexity (Fallback)</span>
                        </div>
                        <div className="flex items-center gap-4 py-3 border-b border-slate-100">
                          <Zap size={18} className="text-slate-900" aria-hidden="true" />
                          <span className="text-xs font-black uppercase tracking-widest w-32 shrink-0">Algorithm</span>
                          <span className="text-sm text-slate-600">Dijkstra (19s → 20ms)</span>
                        </div>
                        <div className="flex items-center gap-4 py-3 border-b border-slate-100">
                          <Shield size={18} className="text-slate-900" aria-hidden="true" />
                          <span className="text-xs font-black uppercase tracking-widest w-32 shrink-0">Reliability</span>
                          <span className="text-sm text-slate-600">Circuit Breaker / Fallback</span>
                        </div>
                        <div className="flex items-center gap-4 py-3 border-b border-slate-100">
                          <Code2 size={18} className="text-slate-900" aria-hidden="true" />
                          <span className="text-xs font-black uppercase tracking-widest w-32 shrink-0">Infra</span>
                          <span className="text-sm text-slate-600">AWS Blue-Green / VPC</span>
                        </div>
                      </div>
                      <div className="mt-10">
                        <a href="https://github.com/woowacourse-teams/2025-moitz/tree/be-prod" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:opacity-70 transition-opacity p-2 -m-2">
                          <Github size={14} aria-hidden="true" />
                          <span>View Source (Backend)</span>
                        </a>
                      </div>
                    </div>

                    <div>
                      <span className="section-label !text-[14px] mb-8 block">Key Contributions</span>
                      <ul className="space-y-6 text-[15px] text-slate-600 leading-relaxed">
                        <li className="flex gap-3">
                          <span className="text-slate-900 font-bold">1.</span>
                          <span>LLM 응답 안정성을 높이기 위해 프롬프트 엔지니어링</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-slate-900 font-bold">2.</span>
                          <span>핵심 기능인 지하철 이동 경로 조회 로직을 직접 구현해 외부 API 사용 시 19s → 20ms로 단축</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-slate-900 font-bold">3.</span>
                          <span>모임 장소 추천 과정의 카카오맵 API 호출을 Spring WebFlux 기반 비동기·병렬 처리로 최적화해 7s → 290ms로 단축</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-slate-900 font-bold">4.</span>
                          <span>부하 테스트로 CPU 포화 병목을 규명하고 동시성 설정을 튜닝해 CPU 사용률 97% → 80%(17%p 감소)로 절감</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-slate-900 font-bold">5.</span>
                          <span>외부 API 장애로부터 시스템을 보호하기 위해 서킷브레이커 + 재시도를 적용해 응답 실패율을 0%로 낮춤</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-slate-900 font-bold">6.</span>
                          <span>AWS, Docker, Github Actions 등을 활용한 CI/CD 환경 구축</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  */}

                  {/* Deep Dive: Prompt Engineering & LLM Control */}
                  <div id="moitz-prompt" className="bg-slate-50 p-10 rounded-2xl border border-slate-100 space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <span className="section-label !text-[15px] shrink-0">Deep Dive: Prompt Engineering & LLM Control</span>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-muted">Prompt Engineering</span>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-12">
                      <div className="space-y-4">
                        <h5 className="text-[13px] font-black uppercase tracking-widest text-slate-900">🚨 The Problem</h5>
                        <p className="text-[15px] text-slate-600 leading-relaxed">
                          단순 프롬프트만으로는 추천 기준의 일관성 결여, JSON 응답 형식의 불안정성, Hallucination 등의 문제로 서비스 수준의 신뢰성을 확보하기 어려웠습니다. 
                          특히 자연어 생성의 유연성이 시스템 후처리를 방해하는 요소가 되었습니다.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <h5 className="text-[13px] font-black uppercase tracking-widest text-slate-900">🔎 Analysis & Strategy</h5>
                        <p className="text-[15px] text-slate-600 leading-relaxed">
                          모델의 자유도를 줄이고 시스템 요구사항에 맞게 추론 과정을 가이드하는 구조적 설계를 전략으로 수립했습니다.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          {[
                            "역할(전문가)과 핵심 목표(공평성) 정의",
                            "5단계 추론 절차(CoT) 프롬프트 내장",
                            "JSON Schema를 통한 출력 형식 강제",
                            "Few-shot 예시로 응답 패턴 학습",
                            "외부 데이터(Kakao Map) 기반 응답 제한"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-[13px] text-slate-600">
                              <div className="w-1 h-1 rounded-full bg-slate-400" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-[13px] font-black uppercase tracking-widest text-slate-900">🧩 Implementation: Prompt 발췌</h5>
                        <div className="code-block mono text-[12px] text-slate-600 bg-white whitespace-pre-wrap">
                          {`[역할 정의]
당신은 서울 지하철 노선과 각 역의 특징에 대해 매우 잘 아는 '만남 장소 추천 전문가' AI입니다.

[핵심 목표]
모든 출발지에서 지하철로 이동하는 시간의 공평성(분산이 가장 적은)이 가장 높고,
사용자의 추가 조건을 완벽하게 만족하는 최적의 서울 지하철역을 추천합니다.

[작업 수행 절차]
1. 출발지 분석
2. 후보 역 탐색
3. 이동 시간 공평성 평가
4. 필터링
5. 최종 추천

[출력 형식]
- 최종 응답은 반드시 아래 JSON 구조를 엄격하게 준수해야 합니다.
- summarize_reason: 이모지 1개 포함 20자 이내 요약.
- detail_reason: 논리적 상세 서술(100자 이내).`}
                        </div>
                      </div>

                      <div className="pt-10 border-t border-slate-200 grid grid-cols-2 gap-12">
                        <div>
                          <h5 className="text-[11px] font-black uppercase tracking-widest text-muted mb-3">Impact</h5>
                          <p className="text-[15px] font-bold text-slate-900 leading-tight">추천 일관성 향상 및 JSON 후처리 안정성 확보. Hallucination 위험 최소화.</p>
                        </div>
                        <div>
                          <h5 className="text-[11px] font-black uppercase tracking-widest text-muted mb-3">Key Learning</h5>
                          <p className="text-[15px] font-bold text-slate-900 leading-tight">자연어의 유연성과 시스템의 견고함 사이의 균형을 잡는 프롬프트 설계의 위력.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deep Dive 02: Subway Algorithm Optimization */}
                  <div id="moitz-deep-1" className="bg-slate-50 p-10 rounded-2xl border border-slate-100 space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="space-y-2">
                        <span className="section-label !text-[15px] shrink-0">Deep Dive: Subway Data Pipeline & Shortest Path Algorithm</span>
                        <p className="text-[13px] text-slate-500 font-medium">수도권 지하철 데이터를 수집/정제/적재하여 핵심 기능인 지하철 이동 경로 조회 로직을 직접 구현해 외부 API 사용 시 19s → 20ms로 단축</p>
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-muted">Data & Algorithm</span>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-12">
                      <div className="space-y-4">
                        <h5 className="text-[13px] font-black uppercase tracking-widest text-slate-900">🚨 The Problem</h5>
                        <ul className="text-[15px] text-slate-600 leading-relaxed space-y-1 list-disc list-inside">
                          <li>초기 빠른 MVP 개발을 위해 지하철 경로 조회 외부 API를 활용</li>
                          <li>사용자 요청 1회 당 최대 30번의 경로 조회 필요해 평균 19초의 지연 발생</li>
                        </ul>
                      </div>

                      <div className="space-y-6">
                        <h5 className="text-[13px] font-black uppercase tracking-widest text-slate-900">🔎 Analysis & Thought Process</h5>
                        
                        <div className="space-y-5">
                          <div className="flex gap-5">
                            <span className="text-[13px] font-bold text-muted shrink-0">01</span>
                            <p className="text-[15px] text-slate-600 leading-relaxed">비교적 안정적인 다른 API는 비용이 비싸고 장애 가능성이 존재.</p>
                          </div>
                          <div className="flex gap-5">
                            <span className="text-[13px] font-bold text-muted shrink-0">02</span>
                            <p className="text-[15px] text-slate-600 leading-relaxed">외부 API를 이용하면 비용, Rate Limit, 응답시간, 장애 전파 등 문제 원인이 사라지지 않음</p>
                          </div>
                          <div className="flex gap-5">
                            <span className="text-[13px] font-bold text-muted shrink-0">03</span>
                            <p className="text-[15px] text-slate-600 leading-relaxed">사용하는 API 종류가 문제가 아니라 외부 API를 사용하는 것 자체가 문제임을 파악</p>
                          </div>
                          <div className="flex gap-5">
                            <span className="text-[13px] font-bold text-muted shrink-0">04</span>
                            <p className="text-[15px] text-slate-600 leading-relaxed">데이터 내재화 + 자체 알고리즘 구현 방향 선택</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-[13px] font-black uppercase tracking-widest text-slate-900">🧩 Solution</h5>
                        <ul className="text-[15px] text-slate-600 leading-relaxed space-y-1 list-disc list-inside">
                          <li>PoC로 2개 노선의 지하철 이동 경로 조회 기능을 구현해 실제로 최단 시간 경로를 계산할 수 있는지 가능성 확인</li>
                          <li>공공데이터포털 API를 이용해 24개 노선, 614개 역에 대해 지하철 이동 시간 데이터 수집/정제/적재 자동화</li>
                          <li>역 간 연결 관계를 방향 그래프로 모델링
                            <ul className="pl-6 list-[circle] list-inside">
                              <li>각 간선에 이동 시간 가중치 부여</li>
                            </ul>
                          </li>
                          <li>다익스트라 알고리즘을 직접 구현하여 최단 시간 이동 경로 계산</li>
                        </ul>
                      </div>
                        <div className="rounded-xl overflow-hidden border border-slate-200 mb-6">
                          <img 
                            src="/moitz_subway.png" 
                            alt="Subway Network Graph Analysis" 
                            className="w-full h-auto"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                      <div className="pt-10 border-t border-slate-200 grid grid-cols-2 gap-12">
                        <div>
                          <h5 className="text-[11px] font-black uppercase tracking-widest text-muted mb-3">Impact</h5>
                          <p className="text-[15px] font-bold text-slate-900 leading-tight">실행 시간 19s → 20ms (99.9% 개선). 외부 제약 완전 해소.</p>
                        </div>
                        <div>
                          <h5 className="text-[11px] font-black uppercase tracking-widest text-muted mb-3">Key Learning</h5>
                          <p className="text-[15px] font-bold text-slate-900 leading-tight">외부 API의 한계를 파악하고 핵심 로직을 직접 구현하여 얻은 압도적인 성능 개선과 시스템 통제권.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deep Dive 03: WebClient Async Parallel Processing */}
                  <div id="moitz-deep-3" className="bg-slate-50 p-10 rounded-2xl border border-slate-100 space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <span className="section-label !text-[15px] shrink-0">Deep Dive: Async Parallel Processing</span>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-muted">Performance Tuning</span>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-12">
                      <div className="space-y-4">
                        <h5 className="text-[13px] font-black uppercase tracking-widest text-slate-900">🚨 The Problem</h5>
                        <p className="text-[15px] text-slate-600 leading-relaxed">
                          기존 RestTemplate 기반의 동기 호출 방식은 30개 이상의 외부 API를 순차적으로 호출하며 <strong>약 7초의 응답 지연</strong>을 초래했습니다. 이는 실시간 서비스로서 치명적인 사용자 경험 저하를 의미했습니다.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <h5 className="text-[13px] font-black uppercase tracking-widest text-slate-900">🔎 Analysis & Migration</h5>
                        <p className="text-[15px] text-slate-600 leading-relaxed">
                          I/O Bound 작업이 주를 이루는 서비스 특성상, 쓰레드 차단(Blocking)을 최소화해야 했습니다. Spring WebFlux의 <strong>WebClient</strong>를 도입하여 비동기 논블로킹 모델로의 전환을 결정했습니다.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-[13px] font-black uppercase tracking-widest text-slate-900">🧩 Solution: Reactive Streams</h5>
                        <p className="text-[15px] text-slate-600 leading-relaxed">
                          <code>Mono.zip</code>과 <code>Flux.merge</code>를 활용하여 독립적인 API 요청들을 병렬로 처리했습니다. 
                          또한 커스텀 쓰레드 풀을 설정하여 리액티브 스트림의 효율을 극대화하고, 타임아웃 및 재시도 전략을 정교하게 튜닝했습니다.
                        </p>
                        <div className="rounded-xl overflow-hidden border border-slate-200 mb-6">
                          <img
                            src="/moitz_async.png"
                            alt="Reactive Streams Parallel Processing Flow"
                            className="w-full h-auto"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      <div className="pt-10 border-t border-slate-200 grid grid-cols-2 gap-12">
                        <div>
                          <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-600 mb-3">Impact</h5>
                          <p className="text-[15px] font-bold text-slate-900 leading-tight">응답 시간 7s → 290ms (96% 단축). 시스템 처리량 대폭 향상.</p>
                        </div>
                        <div>
                          <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-600 mb-3">Key Learning</h5>
                          <p className="text-[15px] font-bold text-slate-900 leading-tight">비동기 프로그래밍을 통한 리소스 활용 최적화의 위력.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deep Dive 04: 외부 API 장애 대응을 위한 예외 처리·서킷브레이커 체계 구축 */}
                  <div id="moitz-deep-4" className="bg-slate-50 p-10 rounded-2xl border border-slate-100 space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="space-y-2">
                        <span className="section-label !text-[15px] shrink-0">Deep Dive: 외부 API 장애 대응을 위한 예외 처리·서킷브레이커 체계 구축</span>
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-muted">Fault Tolerance</span>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-12">
                      <div className="space-y-4">
                        <h5 className="text-[13px] font-black uppercase tracking-widest text-slate-900">🚨 문제</h5>
                        <p className="text-[15px] text-slate-600 leading-relaxed">
                          서비스는 추천 지역 선정을 위해 LLM API를 포함해 카카오 로컬 API, 공공데이터포털 API 등 여러 외부 시스템을 연동하고 있었습니다. 운영 중 <strong>API 문서와 실제 응답의 불일치, 간헐적 500 응답, 잘못된 JSON 응답, 심지어 HTTP 상태코드 200이지만 본문에 에러 메시지가 포함되는 케이스</strong>까지 발생하면서, 사용자가 에러 화면을 보거나 응답을 오래 기다리는 문제가 생겼습니다. 외부 시스템의 불안정성이 곧바로 서비스 가용성/신뢰도 저하로 이어져, “외부 API 실패를 전제로 한” 일관된 대응 체계가 필요했습니다.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <h5 className="text-[13px] font-black uppercase tracking-widest text-slate-900">🧩 해결</h5>
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <h6 className="text-[14px] font-bold text-slate-800">외부 API 예외 처리 표준화</h6>
                            <ul className="text-[15px] text-slate-600 leading-relaxed space-y-1 list-disc list-inside">
                              <li>API별 에러 코드를 정의하여 원인 식별을 표준화(예: LLM API: E000x, Kakao API: E002x 등)</li>
                              <li><strong>응답 본문 파싱</strong>을 통해 HTTP 상태코드만으로 판단하기 어려운 실패(200 + error body)까지 정확히 분류</li>
                              <li>GlobalExceptionHandler에서 외부 API 예외를 일괄 처리하고, <strong>HTTP 메서드/URI/에러코드/메시지</strong>를 error 레벨로 구조화 로깅</li>
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <h6 className="text-[14px] font-bold text-slate-800">실패 유형에 따른 복구 전략 적용(재시도 + 서킷브레이커)</h6>
                            <ul className="text-[15px] text-slate-600 leading-relaxed space-y-1 list-disc list-inside">
                              <li>장애를 “재시도 가치가 있는 실패”와 “재시도 무의미한 실패”로 구분
                                <ul className="pl-6 list-[circle] list-inside">
                                  <li><strong>재시도 가능한 케이스</strong>(네트워크 타임아웃, 500 Internal Server Error 등): 1회 재시도 후, 실패율이 임계치(60%)를 넘으면 서킷브레이커 OPEN 전환</li>
                                  <li><strong>재시도 무의미한 케이스</strong>(API 키 오류, 쿼터 소진 등): 즉시 서킷브레이커 OPEN 전환으로 불필요한 지연 제거</li>
                                </ul>
                              </li>
                              <li>Resilience4j 서킷브레이커 상태 전이(CLOSED → OPEN → HALF_OPEN → CLOSED)를 활용해 외부 API의 회복 여부를 점진적으로 검증</li>
                              <li>LLM은 <strong>Gemini를 메인, Perplexity를 Fallback</strong>으로 구성해 장애 상황에서도 응답을 보장</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="pt-10 border-t border-slate-200 grid grid-cols-2 gap-12">
                        <div>
                          <h5 className="text-[11px] font-black uppercase tracking-widest text-muted mb-3">Impact</h5>
                          <ul className="text-[15px] font-bold text-slate-900 leading-tight space-y-2">
                            <li>테스트 환경에서 <strong>외부 LLM 장애로 인한 실패율 0%</strong>를 달성했고, 운영에서도 LLM 장애로 인한 실패 응답이 발생하지 않음</li>
                            <li>로그만 확인해도 “어떤 외부 API가, 어떤 이유(에러 코드)로 실패했는지” 즉시 파악 가능해져 <strong>장애 대응 시간 단축</strong></li>
                            <li>외부 의존성에서 발생하는 문제를 <strong>표준화된 코드·로깅·복구 전략</strong>으로 흡수하여 서비스 연속성을 확보</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-[11px] font-black uppercase tracking-widest text-muted mb-3">Key Learning</h5>
                          <p className="text-[15px] font-bold text-slate-900 leading-tight">
                            <strong>외부 시스템은 언제든 실패할 수 있다</strong>는 전제를 설계에 반영해야 한다는 원칙을 체득했습니다. 특히 “예외 분류(원인 식별)”가 선행되어야 “재시도/서킷브레이커/폴백” 같은 복구 전략이 효과적으로 작동한다는 점을 이해했고, 이 패턴이 결제·메시징·지도 등 다양한 외부 연동에도 확장 가능하다는 확신을 얻었습니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deep Dive 05: Infrastructure & CI/CD Automation */}
                  <div id="moitz-deep-5" className="bg-slate-50 p-10 rounded-2xl border border-slate-100 space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <span className="section-label !text-[15px] shrink-0">Deep Dive: Infrastructure & CI/CD</span>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-muted">DevOps & Cloud</span>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-12">
                      <div className="space-y-4">
                        <h5 className="text-[13px] font-black uppercase tracking-widest text-slate-900">🚨 The Problem</h5>
                        <p className="text-[15px] text-slate-600 leading-relaxed">
                          수동 배포 방식은 휴먼 에러의 위험이 크고, 배포 시마다 수 분간의 서비스 중단이 발생하여 실시간 사용자 협업이 중요한 서비스 특성상 큰 제약이 되었습니다.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <h5 className="text-[13px] font-black uppercase tracking-widest text-slate-900">🔎 Analysis & Strategy</h5>
                        <p className="text-[15px] text-slate-600 leading-relaxed">
                          코드 변경 사항을 즉각적으로 검증하고 안전하게 배포할 수 있는 자동화 파이프라인이 필요했습니다. 특히, 사용자에게 영향을 주지 않는 <strong>무중단 배포(Zero-Downtime Deployment)</strong> 환경 구축을 목표로 설정했습니다.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-[13px] font-black uppercase tracking-widest text-slate-900">🧩 Solution: Blue-Green Deployment</h5>
                          <p className="text-[15px] text-slate-600 leading-relaxed">
                            GitHub Actions를 활용하여 빌드 및 테스트를 자동화하고, NCP(Naver Cloud Platform)의 로드 밸런서를 제어하여 <strong>Blue-Green 배포</strong>를 구현했습니다. 
                            새로운 버전(Green)이 정상 가동됨을 확인한 후 트래픽을 일괄 전환함으로써 배포 리스크를 최소화했습니다.
                          </p>
                      </div>

                      <div className="pt-10 border-t border-slate-200 grid grid-cols-2 gap-12">
                        <div>
                          <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-600 mb-3">Impact</h5>
                          <p className="text-[15px] font-bold text-slate-900 leading-tight">배포 시 가동 중단 시간 0ms 달성. 배포 자동화로 운영 효율성 증대.</p>
                        </div>
                        <div>
                          <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-600 mb-3">Key Learning</h5>
                          <p className="text-[15px] font-bold text-slate-900 leading-tight">안정적인 서비스 운영을 위한 인프라 자동화의 핵심적 역할.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>

        {/* Tools Section */}
        <section id="tools" className="mb-32">
          <div className="section-label">
            <span className="opacity-70">02 /</span>
            <span>Tools</span>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tool 1: Custom Skills */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-line hover:border-slate-300 transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white rounded-xl border border-line group-hover:scale-110 transition-transform">
                  <Wrench size={24} className="text-slate-900" />
                </div>
                <a href="https://github.com/saera-yook/custom-skills" target="_blank" rel="noreferrer" className="text-muted hover:text-black transition-colors">
                  <Github size={20} />
                </a>
              </div>
              <h5 className="text-lg font-bold mb-3">Custom Skills Library</h5>
              <p className="text-sm text-muted leading-relaxed mb-6">
                AI 에이전트의 기능을 확장하기 위한 재사용 가능한 커스텀 스킬 셋입니다.
                DDD/헥사고날 아키텍처 설계 가이드와 Spring Boot JPA CRUD 스캐폴딩 템플릿을 에이전트가 일관되게 실행할 수 있는 스킬 형태로 패키징했습니다.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white border border-line rounded">AI Tooling</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white border border-line rounded">Domain Modeling</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white border border-line rounded">Code Generation</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white border border-line rounded">Arch Decision</span>
              </div>
            </div>

            {/* Tool 2: Java Coupon System */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-line hover:border-slate-300 transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white rounded-xl border border-line group-hover:scale-110 transition-transform">
                  <FileText size={24} className="text-slate-900" />
                </div>
                <a href="https://github.com/saera-yook/java-coupon/tree/saera-yook" target="_blank" rel="noreferrer" className="text-muted hover:text-black transition-colors">
                  <Github size={20} />
                </a>
              </div>
              <h5 className="text-lg font-bold mb-3">Index Study Docs Automation</h5>
              <p className="text-sm text-muted leading-relaxed mb-6">
                인덱스 설계 학습 내용을 문서로 체계적으로 정리하고 기록하는 작업을 자동화하는 스킬입니다. 
                사용자가 풀이 과정이나 학습 내용을 남겨달라고 요청하면, 문서 폴더와 템플릿을 생성하고 진행 현황이 보이도록 인덱스 문서까지 함께 갱신합니다.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white border border-line rounded">Documentation</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white border border-line rounded">Automation</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white border border-line rounded">Index Design</span>
              </div>
            </div>
          </div>
        </section>

        {/* Skills / About */}
        <section id="skills" className="mb-32">
          <div className="section-label">
            <span className="opacity-70">03 /</span>
            <span>Technical Focus</span>
          </div>
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-muted">Backend & Infrastructure</h4>
              <ul className="space-y-6">
                <li className="space-y-2">
                  <div className="text-sm font-bold">Java & Spring Boot</div>
                  <p className="text-sm text-muted leading-relaxed">
                    MVC 아키텍처와 JPA를 활용한 안정적인 서버 구축에 능숙하며, WebClient를 이용한 비동기 논블로킹 통신 최적화 경험이 있습니다.
                  </p>
                </li>
                <li className="space-y-2">
                  <div className="text-sm font-bold">Database Design</div>
                  <p className="text-sm text-muted leading-relaxed">
                    MySQL과 MongoDB를 활용하여 서비스 요구사항에 맞는 효율적인 데이터 모델링과 쿼리 최적화를 수행할 수 있습니다.
                  </p>
                </li>
                <li className="space-y-2">
                  <div className="text-sm font-bold">Cloud & DevOps</div>
                  <p className="text-sm text-muted leading-relaxed">
                    AWS(VPC, EC2, S3) 환경 구축과 GitHub Actions를 이용한 CI/CD 파이프라인 자동화, 무중단 배포 환경 운영이 가능합니다.
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-muted">AI & System Reliability</h4>
              <ul className="space-y-6">
                <li className="space-y-2">
                  <div className="text-sm font-bold">AI Engineering</div>
                  <p className="text-sm text-muted leading-relaxed">
                    OpenAI와 Gemini 등 다양한 LLM을 서비스에 통합하고, RAG(Retrieval-Augmented Generation) 파이프라인을 구축하여 신뢰성 있는 AI 기능을 구현합니다.
                  </p>
                </li>
                <li className="space-y-2">
                  <div className="text-sm font-bold">Fault Tolerance</div>
                  <p className="text-sm text-muted leading-relaxed">
                    Resilience4j를 활용한 서킷 브레이커 패턴 적용으로 외부 API 장애 전파를 차단하고, 시스템 가용성을 극대화하는 설계를 지향합니다.
                  </p>
                </li>
                <li className="space-y-2">
                  <div className="text-sm font-bold">Monitoring</div>
                  <p className="text-sm text-muted leading-relaxed">
                    CloudWatch와 로그 분석을 통해 시스템 지표를 모니터링하고, 발생 가능한 이슈를 사전에 파악하여 대응하는 프로세스에 익숙합니다.
                  </p>
                </li>
              </ul>
            </div>
          </div>

        </section>

        {/* Experience & Sharing */}
        <section id="experience" className="mb-24">
          <div className="section-label">
            <span className="opacity-70">04 /</span>
            <span>Experience & Sharing</span>
          </div>
          <article className="project-card">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xl font-bold">YouTube 우아한테크 채널 - [10분 테코톡] 아이나의 서킷브레이커</h4>
              <a href="https://youtu.be/lddAZUvOUrs?si=Qx58-lz4nSvyBja_" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted hover:text-black transition-colors p-3 -m-3" aria-label="보러가기: 아이나의 서킷브레이커 테코톡">
                <span>보러가기</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <p className="text-muted mb-4 leading-relaxed">
              우아한테크코스 테코톡에서 Circuit Breaker의 개념과 원리, 그리고 프로젝트에 직접 적용하며 겪은 장애 대응 전략을 공유했습니다.
            </p>
            <div className="flex gap-2">
              <span className="tag">Public Speaking</span>
              <span className="tag">Circuit Breaker</span>
            </div>
          </article>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-line flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-muted">© 2026 Portfolio</span>
          <div className="flex gap-6 text-sm font-medium">
            <a href="mailto:yook.saera@gmail.com" className="hover:text-muted transition-colors p-3 -m-3">Email</a>
            <a href="https://github.com/saera-yook" target="_blank" rel="noreferrer" className="hover:text-muted transition-colors p-3 -m-3">GitHub</a>
            <a href="tel:+821000000000" className="hover:text-muted transition-colors p-3 -m-3">Contact</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
