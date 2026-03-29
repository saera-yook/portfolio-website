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
  Shield
} from "lucide-react";

const ProjectItem = ({ 
  title, 
  description, 
  tags, 
  link, 
  github,
  details 
}: { 
  title: string, 
  description: string, 
  tags: string[], 
  link?: string,
  github?: string,
  details?: React.ReactNode
}) => (
  <div className="project-card">
    <div className="flex justify-between items-start mb-2">
      {link ? (
        <a href={link} target="_blank" rel="noreferrer" className="group/title">
          <h3 className="text-2xl font-bold group-hover/title:underline">{title}</h3>
        </a>
      ) : (
        <h3 className="text-2xl font-bold">{title}</h3>
      )}
      <div className="flex items-center gap-6">
        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted hover:text-black transition-colors">
            <span>사용해보기</span>
            <ArrowUpRight size={16} />
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted hover:text-black transition-colors">
            <span>GitHub</span>
            <Github size={16} />
          </a>
        )}
      </div>
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

const SideNav = () => {
  const [activeId, setActiveId] = useState("");
  
  const sections = [
    { id: "header", label: "Intro" },
    { id: "projects", label: "01 Projects" },
    { id: "tax-free", label: "Tax-Free", indent: true },
    { id: "moitz", label: "Moitz", indent: true },
    { id: "moitz-deep-1", label: "Subway Algo", indent: true, sub: true },
    { id: "moitz-deep-2", label: "AI Fallback", indent: true, sub: true },
    { id: "moitz-deep-3", label: "WebClient", indent: true, sub: true },
    { id: "moitz-deep-4", label: "Resilience4j", indent: true, sub: true },
    { id: "moitz-deep-5", label: "Blue-Green", indent: true, sub: true },
    { id: "skills", label: "02 Focus" },
    { id: "experience", label: "03 Sharing" },
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
    <nav className="fixed left-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-50 w-48">
      <div className="flex flex-col gap-3">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`group flex items-center gap-3 transition-all duration-300 ${
              activeId === s.id 
                ? "text-black translate-x-2" 
                : "text-slate-400 hover:text-slate-600"
            } ${s.indent ? (s.sub ? "ml-8" : "ml-4") : ""}`}
            onClick={(e) => {
              // The scroll listener will handle the active state update
            }}
          >
            <div className={`h-1 w-1 rounded-full bg-current transition-all duration-300 ${
              activeId === s.id ? "scale-150" : "scale-0"
            }`} />
            <span className={`font-black uppercase tracking-[0.2em] whitespace-nowrap ${
              s.sub ? "text-[9px]" : "text-[11px]"
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
      <div className="container-narrow">
        {/* Header */}
        <header id="header" className="mb-24 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-xl">
            <h1 className="text-4xl font-black mb-4">Developer Portfolio</h1>
            <p className="text-xl text-muted">
              AI 엔지니어링과 고속 프로토타이핑에 특화된 풀스택 개발자입니다. 
              기술의 핵심을 파악하고 실질적인 솔루션을 구축합니다.
            </p>
          </div>
          
          {/* Vertical Contact Points */}
          <div className="flex flex-col gap-4 pt-2 shrink-0">
            <a href="mailto:yook.saera@gmail.com" className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-black transition-colors group">
              <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center group-hover:border-black transition-colors">
                <Mail size={14} className="text-muted group-hover:text-black" />
              </div>
              <span>Email</span>
            </a>
            <a href="https://github.com/saera-yook" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-black transition-colors group">
              <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center group-hover:border-black transition-colors">
                <Github size={14} className="text-muted group-hover:text-black" />
              </div>
              <span>GitHub</span>
            </a>
            <a href="tel:+821000000000" className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-black transition-colors group">
              <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center group-hover:border-black transition-colors">
                <Phone size={14} className="text-muted group-hover:text-black" />
              </div>
              <span>Contact</span>
            </a>
          </div>
        </header>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <div className="section-label">
            <span className="opacity-30">01 /</span>
            <span>Selected Projects</span>
          </div>
          
          <div className="space-y-12">
            {/* Project: Tax-Free */}
            <div id="tax-free">
              <ProjectItem 
                title="Tax-Free"
                description="개인사업자와 프리랜서를 위한 AI 세무 비서. 국세청의 '2025년 세금절약가이드'를 학습한 RAG 기반 지능형 상담 시스템입니다."
                tags={["AI", "RAG", "Next.js 14", "OpenAI Assistants"]}
                link="https://tax-free.vercel.app/"
                github="https://github.com/saera-yook"
              details={
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
                      <div className="code-block mono text-[11px] text-slate-500">
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
              }
            />
          </div>

            {/* Project: Moitz */}
            <div id="moitz">
              <ProjectItem 
                title="Moitz (모잇지)"
                description="모임 멤버들의 출발지와 목적을 기반으로 지리적 중간 지점을 계산하고, LLM 기반 AI 추천을 통해 최적의 장소를 큐레이션하는 서비스입니다."
                tags={["AI/LLM", "Java", "Spring Boot", "MongoDB", "AWS", "Infrastructure"]}
                link="https://moitz.kr/"
                github="https://github.com/woowacourse-teams/2025-moitz/tree/be-prod"
              details={
                <div className="space-y-16 mt-12">
                  <div className="grid md:grid-cols-2 gap-16">
                    {/* Engineering Impact */}
                    <div>
                      <span className="section-label !text-[14px] mb-8 block">Engineering Impact</span>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 py-3 border-b border-slate-100">
                          <Cpu size={18} className="text-slate-900" />
                          <span className="text-xs font-black uppercase tracking-widest w-32 shrink-0">AI Model</span>
                          <span className="text-sm text-slate-600">Gemini (Main) / Perplexity (Fallback)</span>
                        </div>
                        <div className="flex items-center gap-4 py-3 border-b border-slate-100">
                          <Zap size={18} className="text-slate-900" />
                          <span className="text-xs font-black uppercase tracking-widest w-32 shrink-0">Algorithm</span>
                          <span className="text-sm text-slate-600">Dijkstra (19s → 20ms)</span>
                        </div>
                        <div className="flex items-center gap-4 py-3 border-b border-slate-100">
                          <Shield size={18} className="text-slate-900" />
                          <span className="text-xs font-black uppercase tracking-widest w-32 shrink-0">Reliability</span>
                          <span className="text-sm text-slate-600">Circuit Breaker / Fallback</span>
                        </div>
                        <div className="flex items-center gap-4 py-3 border-b border-slate-100">
                          <Code2 size={18} className="text-slate-900" />
                          <span className="text-xs font-black uppercase tracking-widest w-32 shrink-0">Infra</span>
                          <span className="text-sm text-slate-600">AWS Blue-Green / VPC</span>
                        </div>
                      </div>
                      <div className="mt-10">
                        <a href="https://github.com/woowacourse-teams/2025-moitz/tree/be-prod" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:opacity-70 transition-opacity">
                          <Github size={14} />
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

                  {/* Deep Dive 1: Subway Algorithm Optimization */}
                  <div id="moitz-deep-1" className="bg-slate-50 p-10 rounded-2xl border border-slate-100 space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <span className="section-label !text-[14px] shrink-0">Deep Dive: Subway Algorithm Optimization</span>
                      <a href="https://github.com/woowacourse-teams/2025-moitz/tree/be-prod" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-black transition-colors">
                        <Github size={12} />
                        <span>View Implementation</span>
                      </a>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-12">
                      <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">🚨 The Problem</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          외부 API 의존 시 1회 요청당 최대 30회의 경로 조회가 필요하여 <strong>평균 19초의 지연</strong>이 발생했습니다. 
                          이를 해결하기 위해 614개 역 데이터를 직접 모델링하여 자체 알고리즘을 구현했으나, 
                          초기 버전에서 <strong>'불필요한 환승이 포함되는 경로'</strong>를 최단 시간으로 오판하는 결함이 발견되었습니다.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">🔎 Analysis & Thought Process</h5>
                        <div className="space-y-5">
                          <div className="flex gap-5">
                            <span className="text-xs font-bold text-slate-400 shrink-0">01</span>
                            <p className="text-sm text-slate-600 leading-relaxed">문제를 재현하는 테스트 코드를 작성하고, 특정 구간(미금→정자)에서 이동 시간이 30초 더 빠른 노선이 선택됨을 확인했습니다.</p>
                          </div>
                          <div className="flex gap-5">
                            <span className="text-xs font-bold text-slate-400 shrink-0">02</span>
                            <p className="text-sm text-slate-600 leading-relaxed"><strong>가설 설정:</strong> "알고리즘이 구간별 최단 시간에만 치우쳐 전체 환승 비용을 충분히 반영하지 못하고 있다."</p>
                          </div>
                          <div className="flex gap-5">
                            <span className="text-xs font-bold text-slate-400 shrink-0">03</span>
                            <p className="text-sm text-slate-600 leading-relaxed">Break Point를 통해 추적한 결과, 이동 시간이 동일할 때 탐색 순서상 먼저 방문한 노선을 그대로 유지하는 로직의 허점을 발견했습니다.</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">🧩 Solution & Trade-off</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          모든 구간에서 다음 역까지 고려하는 복잡한 로직 대신, <strong>'복수 노선 후보 저장 및 환승 우선순위 전략'</strong>을 선택했습니다. 
                          미세한 시간 차이(30초 이내)는 동일 시간으로 간주하고, 실제 경로 구성 시 <strong>환승이 없는 노선을 우선 선택</strong>하도록 로직을 개선하여 정확도와 효율성을 모두 잡았습니다.
                        </p>
                      </div>

                      <div className="pt-10 border-t border-slate-200 grid grid-cols-2 gap-12">
                        <div>
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Impact</h5>
                          <p className="text-sm font-bold text-slate-900 leading-tight">실행 시간 19s → 20ms (99.9% 개선). 외부 제약 완전 해소.</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Key Learning</h5>
                          <p className="text-sm font-bold text-slate-900 leading-tight">데이터로 증명하고 테스트로 검증하는 논리적 디버깅의 가치.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deep Dive 2: LLM Recommendation Engine & Fallback Strategy */}
                  <div id="moitz-deep-2" className="bg-slate-50 p-10 rounded-2xl border border-slate-100 space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <span className="section-label !text-[14px] shrink-0">Deep Dive: LLM Recommendation & Fallback</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted">AI Engineering</span>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-12">
                      <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">🚨 The Problem</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          단일 LLM(Gemini)에 의존할 경우, API 할당량 초과나 일시적인 네트워크 지연 시 서비스 전체의 핵심 기능인 '장소 추천'이 마비되는 리스크가 있었습니다.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">🔎 Analysis & Strategy</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          추천의 품질(Reasoning)과 응답 속도(Latency) 사이의 균형이 필요했습니다. Gemini는 복잡한 맥락 파악에 능하지만, 장애 상황을 대비한 <strong>'고가용성 아키텍처'</strong>가 필수적이었습니다.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">🧩 Solution: Dual-Model Fallback</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Gemini를 메인 엔진으로 사용하되, 에러 발생 시 즉시 <strong>Perplexity API로 전환되는 Fallback 로직</strong>을 구현했습니다. 
                          두 모델의 프롬프트를 표준화하여 사용자 경험의 이질감을 최소화하고, 서킷 브레이커와 연동하여 시스템 안정성을 극대화했습니다.
                        </p>
                      </div>

                      <div className="pt-10 border-t border-slate-200 grid grid-cols-2 gap-12">
                        <div>
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Impact</h5>
                          <p className="text-sm font-bold text-slate-900 leading-tight">AI 추천 기능 가동률 100% 유지. 장애 상황 자동 대응.</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Key Learning</h5>
                          <p className="text-sm font-bold text-slate-900 leading-tight">외부 서비스 의존성을 관리하는 방어적 프로그래밍의 중요성.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deep Dive 3: WebClient Async Parallel Processing */}
                  <div id="moitz-deep-3" className="bg-slate-50 p-10 rounded-2xl border border-slate-100 space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <span className="section-label !text-[14px] shrink-0">Deep Dive: Async Parallel Processing</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Performance Tuning</span>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-12">
                      <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">🚨 The Problem</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          기존 RestTemplate 기반의 동기 호출 방식은 30개 이상의 외부 API를 순차적으로 호출하며 <strong>약 7초의 응답 지연</strong>을 초래했습니다. 이는 실시간 서비스로서 치명적인 사용자 경험 저하를 의미했습니다.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">🔎 Analysis & Migration</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          I/O Bound 작업이 주를 이루는 서비스 특성상, 쓰레드 차단(Blocking)을 최소화해야 했습니다. Spring WebFlux의 <strong>WebClient</strong>를 도입하여 비동기 논블로킹 모델로의 전환을 결정했습니다.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">🧩 Solution: Reactive Streams</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          <code>Mono.zip</code>과 <code>Flux.merge</code>를 활용하여 독립적인 API 요청들을 병렬로 처리했습니다. 
                          또한 커스텀 쓰레드 풀을 설정하여 리액티브 스트림의 효율을 극대화하고, 타임아웃 및 재시도 전략을 정교하게 튜닝했습니다.
                        </p>
                      </div>

                      <div className="pt-10 border-t border-slate-200 grid grid-cols-2 gap-12">
                        <div>
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Impact</h5>
                          <p className="text-sm font-bold text-slate-900 leading-tight">응답 시간 7s → 290ms (96% 단축). 시스템 처리량 대폭 향상.</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Key Learning</h5>
                          <p className="text-sm font-bold text-slate-900 leading-tight">비동기 프로그래밍을 통한 리소스 활용 최적화의 위력.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deep Dive 4: Resilience4j Circuit Breaker */}
                  <div id="moitz-deep-4" className="bg-slate-50 p-10 rounded-2xl border border-slate-100 space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <span className="section-label !text-[14px] shrink-0">Deep Dive: Resilience4j Circuit Breaker</span>
                      <a href="https://github.com/woowacourse-teams/2025-moitz/tree/be-prod" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-black transition-colors">
                        <Github size={12} />
                        <span>View Implementation</span>
                      </a>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-12">
                      <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">🚨 The Problem</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          특정 외부 API(예: 구글 맵스)의 응답 지연이나 장애가 발생했을 때, 해당 요청을 기다리는 쓰레드들이 쌓이면서 전체 시스템이 마비되는 <strong>'장애 전파(Cascading Failure)'</strong> 현상이 발생했습니다.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">🔎 Analysis & Solution</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          장애가 발생한 지점을 즉시 격리하고 시스템의 나머지 부분을 보호하는 메커니즘이 필요했습니다. 이를 위해 <strong>Resilience4j</strong>를 도입하여 서킷 브레이커 패턴을 적용했습니다.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">🧩 Implementation Details</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          실패율 임계치(Failure Rate Threshold)를 50%로 설정하고, 장애 발생 시 10초간 서킷을 Open하여 불필요한 호출을 차단했습니다. 
                          서킷이 열린 동안에는 미리 정의된 <strong>Fallback 데이터(캐시된 장소 정보 등)</strong>를 반환하여 최소한의 서비스 기능을 유지하도록 설계했습니다.
                        </p>
                      </div>

                      <div className="pt-10 border-t border-slate-200 grid grid-cols-2 gap-12">
                        <div>
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Impact</h5>
                          <p className="text-sm font-bold text-slate-900 leading-tight">장애 전파 완전 차단. 외부 요인에 관계없이 서비스 가용성 확보.</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Key Learning</h5>
                          <p className="text-sm font-bold text-slate-900 leading-tight">분산 시스템에서 결함 내성(Fault Tolerance) 설계의 필수성.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deep Dive 5: Infrastructure & CI/CD Automation */}
                  <div id="moitz-deep-5" className="bg-slate-50 p-10 rounded-2xl border border-slate-100 space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <span className="section-label !text-[14px] shrink-0">Deep Dive: Infrastructure & CI/CD</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted">DevOps & Cloud</span>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-12">
                      <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">🚨 The Problem</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          수동 배포 방식은 휴먼 에러의 위험이 크고, 배포 시마다 수 분간의 서비스 중단이 발생하여 실시간 사용자 협업이 중요한 서비스 특성상 큰 제약이 되었습니다.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">🔎 Analysis & Strategy</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          코드 변경 사항을 즉각적으로 검증하고 안전하게 배포할 수 있는 자동화 파이프라인이 필요했습니다. 특히, 사용자에게 영향을 주지 않는 <strong>무중단 배포(Zero-Downtime Deployment)</strong> 환경 구축을 목표로 설정했습니다.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">🧩 Solution: Blue-Green Deployment</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          GitHub Actions를 활용하여 빌드 및 테스트를 자동화하고, NCP(Naver Cloud Platform)의 로드 밸런서를 제어하여 <strong>Blue-Green 배포</strong>를 구현했습니다. 
                          새로운 버전(Green)이 정상 가동됨을 확인한 후 트래픽을 일괄 전환함으로써 배포 리스크를 최소화했습니다.
                        </p>
                      </div>

                      <div className="pt-10 border-t border-slate-200 grid grid-cols-2 gap-12">
                        <div>
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Impact</h5>
                          <p className="text-sm font-bold text-slate-900 leading-tight">배포 시 가동 중단 시간 0ms 달성. 배포 자동화로 운영 효율성 증대.</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Key Learning</h5>
                          <p className="text-sm font-bold text-slate-900 leading-tight">안정적인 서비스 운영을 위한 인프라 자동화의 핵심적 역할.</p>
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

        {/* Skills / About */}
        <section id="skills" className="mb-24">
          <div className="section-label">
            <span className="opacity-30">02 /</span>
            <span>Technical Focus</span>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
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
            <span className="opacity-30">03 /</span>
            <span>Experience & Sharing</span>
          </div>
          <div className="project-card">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-xl font-bold">YouTube 우아한테크 채널 - [10분 테코톡] 아이나의 서킷브레이커</h4>
              <a href="https://youtu.be/lddAZUvOUrs?si=Qx58-lz4nSvyBja_" target="_blank" rel="noreferrer" className="text-muted hover:text-black transition-colors">
                <ArrowUpRight size={20} />
              </a>
            </div>
            <p className="text-muted mb-4 leading-relaxed">
              우아한테크코스 테코톡에서 Circuit Breaker의 개념과 원리, 그리고 프로젝트에 직접 적용하며 겪은 장애 대응 전략을 공유했습니다.
            </p>
            <div className="flex gap-2">
              <span className="tag">Public Speaking</span>
              <span className="tag">Circuit Breaker</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-line flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-muted">© 2026 Portfolio</span>
          <div className="flex gap-6 text-sm font-medium">
            <a href="mailto:yook.saera@gmail.com" className="hover:text-muted transition-colors">Email</a>
            <a href="https://github.com/saera-yook" target="_blank" rel="noreferrer" className="hover:text-muted transition-colors">GitHub</a>
            <a href="#" className="hover:text-muted transition-colors">LinkedIn</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
