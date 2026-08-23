import React, { useState } from 'react';
import { 
  Zap, 
  Server, 
  Send, 
  Database, 
  Layers, 
  Cpu, 
  Activity, 
  Play, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { sound } from '../../utils/SoundEffects';

interface NodeInfo {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  color: string;
  description: string;
  metrics: { label: string; value: string }[];
  details: string[];
}

const ARCHITECTURE_NODES: Record<string, NodeInfo> = {
  ingress: {
    id: 'ingress',
    title: 'Fastify v5 API Ingress',
    category: 'Ingress & Validation',
    icon: Server,
    color: 'cyan',
    description: 'High-throughput HTTP entry point deployed on AWS Lambda with schema-level Drizzle validation.',
    metrics: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Throughput', value: '150+ Workflows' },
      { label: 'Cold Starts', value: '-40%' },
    ],
    details: [
      'Sub-5ms route registration and serialized schema checking',
      'Non-blocking async ingestion decoupling request from execution',
      'Pino structured logging with zero-overhead correlation IDs',
    ],
  },
  sns: {
    id: 'sns',
    title: 'AWS SNS Event Bus',
    category: 'Message Fan-out',
    icon: Zap,
    color: 'purple',
    description: 'Central event distributor broadcasting triggers to regional decoupled worker queues.',
    metrics: [
      { label: 'Latency Drop', value: '~80%' },
      { label: 'Isolation', value: '100% Fail-Safe' },
      { label: 'Regions', value: 'NA, IN, UK' },
    ],
    details: [
      'Fan-out message routing with deduplication attributes',
      'Prevents synchronous blocking on downstream third-party email providers',
      'Region-specific filtering rules for data residency compliance',
    ],
  },
  sqs: {
    id: 'sqs',
    title: 'AWS SQS Dedicated Queues',
    category: 'Buffer & Backpressure',
    icon: Layers,
    color: 'emerald',
    description: 'Guaranteed message ordering, Dead Letter Queues (DLQ), and burst throttling.',
    metrics: [
      { label: 'DLQ Recovery', value: 'Automated' },
      { label: 'Backpressure', value: 'Adaptive' },
      { label: 'Loss Rate', value: '0.000%' },
    ],
    details: [
      'Dead-Letter Queues for graceful exception isolation',
      'Configurable concurrency and exponential backoff retry policies',
      'Decoupled processing queues per priority tier (Urgent, Standard, Digest)',
    ],
  },
  lambdaWorkers: {
    id: 'lambdaWorkers',
    title: 'AWS Lambda Event Processors',
    category: 'Compute & Business Logic',
    icon: Cpu,
    color: 'cyan',
    description: 'Optimized TypeScript microservices resolving recipients, generating PDFs, and invoking dispatchers.',
    metrics: [
      { label: 'Compute Cost', value: '-35%' },
      { label: 'Cold Start', value: 'Sub-150ms' },
      { label: 'Execution', value: 'Event-Driven' },
    ],
    details: [
      'Memory and bundle size optimization cutting serverless billing by 35%',
      'Programmatic S3 PDF document rendering and escalation engine',
      'Dynamic recipient resolution and business rules evaluation',
    ],
  },
  dispatch: {
    id: 'dispatch',
    title: 'AWS SES & Multi-Region Dispatch',
    category: 'Delivery Gateway',
    icon: Send,
    color: 'purple',
    description: 'High-deliverability enterprise email, SMS, and webhook delivery pipeline.',
    metrics: [
      { label: 'Delivery Rate', value: '99.8%' },
      { label: 'MTTR Alerting', value: '-60%' },
      { label: 'Safeguards', value: 'Non-Prod Active' },
    ],
    details: [
      'Non-production environment email sandboxing & safeguards',
      'Automated bounce, complaint, and reputation metric tracking',
      'Automated CloudWatch alarms triggering MTTR recovery protocols',
    ],
  },
  database: {
    id: 'database',
    title: 'Aurora PostgreSQL + Drizzle ORM',
    category: 'Persistence Layer',
    icon: Database,
    color: 'emerald',
    description: 'Serverless relational database with end-to-end type safety, read replicas, and connection pooling.',
    metrics: [
      { label: 'Query Latency', value: '<8ms' },
      { label: 'Type Safety', value: '100% Strict' },
      { label: 'Audit Trail', value: 'Full History' },
    ],
    details: [
      'Drizzle ORM zero-overhead prepared statements and schema validations',
      'Real-time delivery status, open tracking, and audit logging',
      'High-concurrency connection pooling optimized for serverless Lambda scale',
    ],
  },
};

export const EventArchitectureDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('ingress');
  const [trafficActive, setTrafficActive] = useState<boolean>(false);

  // Traffic surge simulation
  const handleTriggerSurge = () => {
    sound.playLaunch();
    setTrafficActive(true);
    setTimeout(() => {
      setTrafficActive(false);
      sound.playSuccess();
    }, 4500);
  };

  const activeNodeData = ARCHITECTURE_NODES[selectedNode];

  return (
    <div className="w-full glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-cyan-500/20 shadow-2xl">
      {/* Background ambient glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            Live System Blueprint &middot; Production Case Study
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
            AWS Event-Driven Microservice Architecture
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Re-architected at Wysbryx Technologies: transitioned synchronous bottleneck to an asynchronous AWS event bus (SNS &rarr; Lambda &rarr; SQS/SES), slashing API latency by ~80%.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleTriggerSurge}
          disabled={trafficActive}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wide transition-all ${
            trafficActive
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 glow-cyan animate-pulse'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-lg hover:shadow-cyan-500/25 active:scale-95'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${trafficActive ? 'animate-spin' : ''}`} />
          {trafficActive ? 'Simulating High-Load Burst...' : 'Simulate Event Traffic Burst'}
        </button>
      </div>

      {/* Main Architecture Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
        {/* Left: SVG / Node Topology Map (7 cols) */}
        <div className="lg:col-span-7 bg-[#0b0e17] rounded-xl p-5 border border-slate-800/80 relative overflow-hidden">
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 cyber-grid-dense opacity-20 pointer-events-none" />

          {/* Node Flow Diagram */}
          <div className="relative z-10 flex flex-col gap-5">
            {/* Row 1: Ingress */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedNode('ingress');
                }}
                className={`w-full max-w-sm p-3.5 rounded-xl border flex items-center gap-3.5 text-left transition-all ${
                  selectedNode === 'ingress'
                    ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.25)] scale-[1.02]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-850'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Server className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-cyan-400">Step 1: Ingress</div>
                  <div className="font-semibold text-sm text-white">Fastify v5 on Lambda</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  99.9% Uptime
                </span>
              </button>
            </div>

            {/* Connecting Pipe 1 */}
            <div className="flex justify-center items-center h-4 relative">
              <div className="w-0.5 h-full bg-cyan-500/40" />
              {trafficActive && (
                <div className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-ping" />
              )}
            </div>

            {/* Row 2: Event Bus (SNS) */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedNode('sns');
                }}
                className={`w-full max-w-sm p-3.5 rounded-xl border flex items-center gap-3.5 text-left transition-all ${
                  selectedNode === 'sns'
                    ? 'bg-purple-950/50 border-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.25)] scale-[1.02]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-purple-500/40'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-purple-400">Step 2: Decoupler</div>
                  <div className="font-semibold text-sm text-white">AWS SNS Fan-Out Bus</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  -80% Latency
                </span>
              </button>
            </div>

            {/* Connecting Pipe 2 */}
            <div className="flex justify-center items-center h-4 relative">
              <div className="w-0.5 h-full bg-purple-500/40" />
            </div>

            {/* Row 3: Parallel Queues & Workers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedNode('sqs');
                }}
                className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${
                  selectedNode === 'sqs'
                    ? 'bg-emerald-950/50 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-[1.02]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-emerald-400">Step 3A: Buffer</div>
                  <div className="font-semibold text-xs text-white">AWS SQS Queues + DLQ</div>
                </div>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedNode('lambdaWorkers');
                }}
                className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${
                  selectedNode === 'lambdaWorkers'
                    ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.25)] scale-[1.02]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-cyan-400">Step 3B: Worker</div>
                  <div className="font-semibold text-xs text-white">Lambda Logic & S3 PDF</div>
                </div>
              </button>
            </div>

            {/* Connecting Pipe 3 */}
            <div className="flex justify-center items-center h-4 relative">
              <div className="w-0.5 h-full bg-emerald-500/40" />
            </div>

            {/* Row 4: Dispatch & Database */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedNode('dispatch');
                }}
                className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${
                  selectedNode === 'dispatch'
                    ? 'bg-purple-950/50 border-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.25)] scale-[1.02]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-purple-500/40'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-purple-400">Step 4A: Multi-Region</div>
                  <div className="font-semibold text-xs text-white">SES Dispatcher (NA/IN/UK)</div>
                </div>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedNode('database');
                }}
                className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${
                  selectedNode === 'database'
                    ? 'bg-emerald-950/50 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-[1.02]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-emerald-400">Step 4B: Persistence</div>
                  <div className="font-semibold text-xs text-white">Aurora DB + Drizzle ORM</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Selected Node Telemetry & Impact Details (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Telemetry Node Inspector
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                ACTIVE
              </span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white font-display flex items-center gap-2">
                {activeNodeData.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1">{activeNodeData.description}</p>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-3 gap-2">
              {activeNodeData.metrics.map((m, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                  <div className="text-sm font-bold text-cyan-300 font-mono">{m.value}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Architectural Highlights */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Key Architectural Safeguards
              </div>
              {activeNodeData.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Comparison Box */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/30">
              <div className="text-[10px] font-mono text-red-400 uppercase font-semibold">Legacy Architecture</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Synchronous Blocking Calls</div>
              <div className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-red-400" /> ~450ms API Latency
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/30">
              <div className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Engineered by Prem</div>
              <div className="text-xs text-emerald-300 mt-1 font-medium">Asynchronous Event Bus</div>
              <div className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-400" /> ~85ms API Latency (-80%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
