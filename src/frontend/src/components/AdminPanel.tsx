import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  ClipboardList,
  Eye,
  EyeOff,
  HardHat,
  HeartPulse,
  Inbox,
  LogOut,
  Shield,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Inquiry } from "../backend.d";
import { ServiceType } from "../backend.d";
import { useGetAllInquiries } from "../hooks/useQueries";

const ADMIN_PASSWORD = "bsspl2024";

type Filter = "all" | ServiceType;

const SERVICE_LABELS: Record<ServiceType, string> = {
  [ServiceType.security]: "Security",
  [ServiceType.housekeeping]: "Housekeeping",
  [ServiceType.medical]: "Medical",
  [ServiceType.construction]: "Construction",
};

const SERVICE_ICONS: Record<ServiceType, React.ReactNode> = {
  [ServiceType.security]: <Shield size={13} />,
  [ServiceType.housekeeping]: <Sparkles size={13} />,
  [ServiceType.medical]: <HeartPulse size={13} />,
  [ServiceType.construction]: <HardHat size={13} />,
};

const SERVICE_BADGE_COLORS: Record<ServiceType, string> = {
  [ServiceType.security]: "bg-teal/20 text-teal border border-teal/30",
  [ServiceType.housekeeping]: "bg-gold/20 border border-gold/30",
  [ServiceType.medical]:
    "bg-rose-500/20 text-rose-400 border border-rose-500/30",
  [ServiceType.construction]:
    "bg-amber-500/20 text-amber-400 border border-amber-500/30",
};

const FILTERS: { label: string; value: Filter; icon?: React.ReactNode }[] = [
  { label: "All", value: "all" },
  {
    label: "Security",
    value: ServiceType.security,
    icon: <Shield size={13} />,
  },
  {
    label: "Housekeeping",
    value: ServiceType.housekeeping,
    icon: <Sparkles size={13} />,
  },
  {
    label: "Medical",
    value: ServiceType.medical,
    icon: <HeartPulse size={13} />,
  },
  {
    label: "Construction",
    value: ServiceType.construction,
    icon: <HardHat size={13} />,
  },
];

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  if (ms <= 0 || Number.isNaN(ms)) return "—";
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Login Screen ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError("");
      onLogin();
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "oklch(var(--navy))" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(var(--teal)), transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm"
      >
        {/* Card */}
        <div
          className="rounded-2xl border border-white/10 p-8 shadow-2xl"
          style={{ backgroundColor: "oklch(0.18 0.04 235)" }}
          data-ocid="admin.login_panel"
        >
          {/* Logo area */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center border-2 shadow-lg"
              style={{
                backgroundColor: "oklch(var(--navy))",
                borderColor: "oklch(var(--gold))",
              }}
            >
              <Shield size={26} style={{ color: "oklch(var(--gold))" }} />
            </div>
            <div className="text-center">
              <div className="font-display font-black text-white text-xl tracking-wide">
                BSSPL Admin
              </div>
              <div
                className="text-[11px] font-body font-semibold tracking-widest uppercase mt-0.5"
                style={{ color: "oklch(var(--gold))" }}
              >
                Secure Access
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="admin-password"
                className="text-sm font-display font-semibold text-white/70"
              >
                Admin Password
              </label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className="font-body pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-teal/50 focus:ring-teal/20"
                  data-ocid="admin.password.input"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-sm text-red-400 font-body bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                  data-ocid="admin.login.error_state"
                >
                  <AlertCircle size={14} className="flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              className="w-full font-display font-bold text-sm mt-1"
              style={{
                backgroundColor: "oklch(var(--teal))",
                color: "white",
                height: "42px",
              }}
              data-ocid="admin.login.submit_button"
            >
              Login to Admin Panel
            </Button>
          </form>

          <p className="text-center text-white/30 text-xs font-body mt-6">
            Restricted access — BSSPL personnel only
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Inquiry Card (mobile) ──────────────────────────────────────────────────
function InquiryCard({
  inquiry,
  index,
}: {
  inquiry: Inquiry;
  index: number;
}) {
  const ocid = `admin.inquiry.item.${index}` as const;
  const badgeClass = SERVICE_BADGE_COLORS[inquiry.serviceType] ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-xl border border-white/10 p-4 flex flex-col gap-3"
      style={{ backgroundColor: "oklch(0.18 0.04 235)" }}
      data-ocid={ocid}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-display font-bold text-white text-sm">
            {inquiry.name}
          </div>
          <div className="text-white/50 text-xs font-body mt-0.5">
            {formatTimestamp(inquiry.timestamp)}
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-display font-semibold ${badgeClass}`}
          style={
            inquiry.serviceType === ServiceType.housekeeping
              ? { color: "oklch(var(--gold))" }
              : {}
          }
        >
          {SERVICE_ICONS[inquiry.serviceType]}
          {SERVICE_LABELS[inquiry.serviceType]}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-xs font-body text-white/60">
          <span className="text-white/30 w-12 flex-shrink-0">Phone</span>
          <a
            href={`tel:${inquiry.phoneNumber}`}
            className="text-white/80 hover:text-white transition-colors"
          >
            {inquiry.phoneNumber}
          </a>
        </div>
        <div className="flex items-center gap-2 text-xs font-body text-white/60">
          <span className="text-white/30 w-12 flex-shrink-0">Email</span>
          <a
            href={`mailto:${inquiry.email}`}
            className="text-white/80 hover:text-white transition-colors break-all"
          >
            {inquiry.email}
          </a>
        </div>
      </div>

      {inquiry.message && (
        <div className="bg-white/5 rounded-lg px-3 py-2 border border-white/5">
          <p className="text-white/60 text-xs font-body leading-relaxed line-clamp-3">
            {inquiry.message}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ─── Dashboard Screen ────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("all");
  const { data: inquiries, isLoading, isError } = useGetAllInquiries();

  const filtered =
    filter === "all"
      ? (inquiries ?? [])
      : (inquiries ?? []).filter((i) => i.serviceType === filter);

  // Sort newest first
  const sorted = [...filtered].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp),
  );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(var(--navy))" }}
      data-ocid="admin.dashboard.panel"
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-sm"
        style={{ backgroundColor: "oklch(var(--navy) / 0.95)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="text-white/50 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 flex-shrink-0"
              aria-label="Back to site"
              data-ocid="admin.exit.button"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-2 min-w-0">
              <ClipboardList
                size={18}
                style={{ color: "oklch(var(--gold))", flexShrink: 0 }}
              />
              <div className="min-w-0">
                <div className="font-display font-bold text-white text-sm leading-tight">
                  Admin Panel
                </div>
                <div
                  className="text-[10px] font-body tracking-widest uppercase font-semibold hidden sm:block"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  BSSPL — Inquiry Management
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-white/50 hover:text-white hover:bg-white/10 font-display font-semibold text-xs gap-1.5 flex-shrink-0"
            data-ocid="admin.logout.button"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-6 gap-4 flex-wrap"
        >
          <div>
            <h1 className="font-display font-black text-white text-2xl sm:text-3xl">
              Inquiries
            </h1>
            <p className="text-white/40 text-sm font-body mt-0.5">
              {isLoading
                ? "Loading..."
                : `${inquiries?.length ?? 0} total ${(inquiries?.length ?? 0) === 1 ? "inquiry" : "inquiries"} received`}
            </p>
          </div>
          {!isLoading && !isError && (inquiries?.length ?? 0) > 0 && (
            <div
              className="px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2"
              style={{ backgroundColor: "oklch(0.18 0.04 235)" }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "oklch(var(--teal))" }}
              />
              <span className="text-white/60 text-xs font-body">
                <span className="font-display font-bold text-white">
                  {filtered.length}
                </span>{" "}
                {filter === "all"
                  ? "shown"
                  : `in ${SERVICE_LABELS[filter as ServiceType]}`}
              </span>
            </div>
          )}
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="flex gap-2 mb-6 flex-wrap"
          role="tablist"
          aria-label="Filter by service type"
        >
          {FILTERS.map((f) => {
            const isActive = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(f.value)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-display font-semibold border transition-all duration-200 ${
                  isActive
                    ? "border-transparent text-navy"
                    : "border-white/15 text-white/60 hover:text-white hover:border-white/30 bg-white/5"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: "oklch(var(--gold))",
                        color: "oklch(0.12 0.02 40)",
                      }
                    : {}
                }
                data-ocid="admin.filter.tab"
              >
                {f.icon}
                {f.label}
              </button>
            );
          })}
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col gap-3" data-ocid="admin.loading_state">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                className="h-16 w-full rounded-xl"
                style={{ backgroundColor: "oklch(0.18 0.04 235)" }}
              />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <div
            className="flex flex-col items-center justify-center text-center py-20 gap-4"
            data-ocid="admin.error_state"
          >
            <AlertCircle size={32} className="text-red-400" />
            <p className="text-white/60 font-body">
              Failed to load inquiries. Please try again.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && sorted.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center py-24 gap-4"
            data-ocid="admin.empty_state"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10"
              style={{ backgroundColor: "oklch(0.18 0.04 235)" }}
            >
              <Inbox size={28} style={{ color: "oklch(var(--teal))" }} />
            </div>
            <div>
              <div className="font-display font-bold text-white text-lg">
                No inquiries yet
              </div>
              <p className="text-white/40 text-sm font-body mt-1.5 max-w-xs">
                {filter === "all"
                  ? "Inquiries submitted through the contact form will appear here."
                  : `No ${SERVICE_LABELS[filter as ServiceType].toLowerCase()} inquiries found.`}
              </p>
            </div>
          </motion.div>
        )}

        {/* Desktop table */}
        {!isLoading && !isError && sorted.length > 0 && (
          <>
            {/* Desktop */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="hidden md:block rounded-xl overflow-hidden border border-white/10"
              data-ocid="admin.inquiry.table"
            >
              <Table>
                <TableHeader>
                  <TableRow
                    className="border-white/10"
                    style={{ backgroundColor: "oklch(0.15 0.04 235)" }}
                  >
                    <TableHead className="text-white/50 font-display font-semibold text-xs uppercase tracking-wider py-3">
                      #
                    </TableHead>
                    <TableHead className="text-white/50 font-display font-semibold text-xs uppercase tracking-wider py-3">
                      Name
                    </TableHead>
                    <TableHead className="text-white/50 font-display font-semibold text-xs uppercase tracking-wider py-3">
                      Phone
                    </TableHead>
                    <TableHead className="text-white/50 font-display font-semibold text-xs uppercase tracking-wider py-3 hidden lg:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="text-white/50 font-display font-semibold text-xs uppercase tracking-wider py-3">
                      Service
                    </TableHead>
                    <TableHead className="text-white/50 font-display font-semibold text-xs uppercase tracking-wider py-3 hidden xl:table-cell">
                      Message
                    </TableHead>
                    <TableHead className="text-white/50 font-display font-semibold text-xs uppercase tracking-wider py-3">
                      Date & Time
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sorted.map((inquiry, i) => {
                    const badgeClass =
                      SERVICE_BADGE_COLORS[inquiry.serviceType] ?? "";
                    const ocid = `admin.inquiry.item.${i + 1}` as const;
                    return (
                      <TableRow
                        key={Number(inquiry.timestamp)}
                        className="border-white/5 hover:bg-white/5 transition-colors cursor-default"
                        style={
                          i % 2 === 0
                            ? { backgroundColor: "oklch(0.18 0.04 235)" }
                            : { backgroundColor: "oklch(0.17 0.04 235)" }
                        }
                        data-ocid={ocid}
                      >
                        <TableCell className="text-white/30 font-body text-xs py-3.5 pl-4">
                          {i + 1}
                        </TableCell>
                        <TableCell className="font-display font-semibold text-white text-sm py-3.5">
                          {inquiry.name}
                        </TableCell>
                        <TableCell className="py-3.5">
                          <a
                            href={`tel:${inquiry.phoneNumber}`}
                            className="text-white/80 hover:text-white font-body text-sm transition-colors"
                          >
                            {inquiry.phoneNumber}
                          </a>
                        </TableCell>
                        <TableCell className="py-3.5 hidden lg:table-cell">
                          <a
                            href={`mailto:${inquiry.email}`}
                            className="text-white/70 hover:text-white font-body text-sm transition-colors break-all"
                          >
                            {inquiry.email}
                          </a>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-display font-semibold ${badgeClass}`}
                            style={
                              inquiry.serviceType === ServiceType.housekeeping
                                ? { color: "oklch(var(--gold))" }
                                : {}
                            }
                          >
                            {SERVICE_ICONS[inquiry.serviceType]}
                            {SERVICE_LABELS[inquiry.serviceType]}
                          </span>
                        </TableCell>
                        <TableCell className="py-3.5 hidden xl:table-cell max-w-xs">
                          <p className="text-white/50 font-body text-xs leading-relaxed line-clamp-2">
                            {inquiry.message || (
                              <span className="text-white/20 italic">
                                No message
                              </span>
                            )}
                          </p>
                        </TableCell>
                        <TableCell className="py-3.5 text-white/50 font-body text-xs whitespace-nowrap">
                          {formatTimestamp(inquiry.timestamp)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </motion.div>

            {/* Mobile cards */}
            <div className="md:hidden flex flex-col gap-3">
              {sorted.map((inquiry, i) => (
                <InquiryCard
                  key={Number(inquiry.timestamp)}
                  inquiry={inquiry}
                  index={i + 1}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-4 px-4 sm:px-6">
        <p className="text-center text-white/20 text-xs font-body">
          BSSPL Admin Panel — Restricted Access
        </p>
      </footer>
    </div>
  );
}

// ─── Main Admin Panel Export ─────────────────────────────────────────────────
export function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return <Dashboard onLogout={() => setIsAuthenticated(false)} />;
}
