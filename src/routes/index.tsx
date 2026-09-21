import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, Instagram, Linkedin, Menu, X } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NivaTech — Technology for ambitious beginnings" },
      { name: "description", content: "Reliable laptops, workstations and workspace setups, thoughtfully sourced, tested and ready to work." },
      { property: "og:title", content: "NivaTech — Technology for ambitious beginnings" },
      { property: "og:description", content: "Tell us what your team needs. We source, test and set up the right technology." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  ["01", "Laptop Procurement", "Business-class laptops selected around your workload, team size and budget."],
  ["02", "Workspace Setup", "Laptops, monitors, keyboards, mice, docks and essentials assembled into a ready-to-work setup."],
  ["03", "Team Deployment", "Equip your first 2, 5, 10 or more employees through one streamlined procurement process."],
  ["04", "Testing & Configuration", "Devices are inspected, tested and configured before delivery."],
];

const steps = [
  ["01", "Tell us what you need", "Share your team size, workload, budget and location."],
  ["02", "We recommend", "We identify suitable hardware based on your actual requirements."],
  ["03", "We source & test", "We source the equipment and perform a structured hardware inspection."],
  ["04", "You get to work", "Your equipment arrives prepared and ready for use."],
];

const checks = ["CPU", "RAM", "SSD", "Battery", "Display", "Keyboard", "Trackpad", "Ports", "Camera", "Speakers", "Wi-Fi", "Thermals", "Charger", "Physical condition"];

function Mark() {
  return <span aria-hidden="true" className="grid size-8 place-items-center bg-accent"><span className="size-3.5 rotate-45 border-2 border-accent-foreground" /></span>;
}

function SectionLabel({ children }: { children: string }) {
  return <p className="mb-6 font-mono text-[10px] font-bold uppercase text-muted-foreground">// {children}</p>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const nextErrors: Record<string, string> = {};
    for (const key of ["name", "email", "phone", "company", "city", "people_count", "looking_for", "budget", "requirements"]) {
      if (!String(data[key] ?? "").trim()) nextErrors[key] = "This field is required.";
    }
    if (data.email && !/^\S+@\S+\.\S+$/.test(String(data.email))) nextErrors.email = "Enter a valid email address.";
    if (data.requirements && String(data.requirements).trim().length < 10) nextErrors.requirements = "Please share at least a little more detail.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("sending");
    const { error } = await supabase.from("leads").insert({
      ...data,
      people_count: Number(data.people_count),
    });
    if (error) {
      setStatus("error");
      return;
    }
    form.reset();
    setStatus("success");
  }

  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-10">
          <button className="flex items-center gap-3" onClick={() => jump("top")} aria-label="Go to top"><Mark /><span className="font-display text-xl font-bold">NivaTech</span></button>
          <nav className="hidden items-center gap-7 text-xs font-semibold lg:flex" aria-label="Main navigation">
            <button onClick={() => jump("services")} className="transition-colors hover:text-accent">What We Do</button>
            <button onClick={() => jump("process")} className="transition-colors hover:text-accent">How It Works</button>
            <button onClick={() => jump("why")} className="transition-colors hover:text-accent">Why NivaTech</button>
            <button onClick={() => jump("contact")} className="transition-colors hover:text-accent">Contact</button>
          </nav>
          <Button size="sm" className="hidden lg:inline-flex" onClick={() => jump("contact")}>Get a Recommendation <ArrowRight className="size-4" /></Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="grid border-t border-border bg-background p-5 lg:hidden">{[["services","What We Do"],["process","How It Works"],["why","Why NivaTech"],["contact","Contact"]].map(([id,label]) => <button key={id} onClick={() => jump(id)} className="border-b border-border py-4 text-left text-sm font-semibold">{label}</button>)}</nav>}
      </header>

      <section id="top" className="relative min-h-[calc(100vh-4.5rem)] border-b border-border technical-grid">
        <div className="mx-auto grid max-w-7xl lg:min-h-[calc(100vh-4.5rem)] lg:grid-cols-[1.12fr_.88fr] lg:px-10">
          <div className="flex flex-col justify-center border-border px-5 py-20 lg:border-r lg:py-24 lg:pr-16">
            <div className="reveal mb-10 flex w-fit items-center gap-2 border border-border bg-card px-3 py-2 font-mono text-[10px] font-bold uppercase"><span className="size-2 bg-accent" /> Founders' technology partner</div>
            <h1 className="reveal max-w-4xl text-6xl font-bold leading-[.91] sm:text-7xl lg:text-[5.8rem]">Technology for ambitious beginnings.</h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Reliable laptops, workstations and complete workspace setups — thoughtfully sourced, tested and ready to work.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row"><Button size="lg" onClick={() => jump("contact")}>Build My Workspace <ArrowRight className="size-4" /></Button><Button size="lg" variant="outline" onClick={() => jump("founders")}>Talk to NivaTech</Button></div>
            <p className="mt-9 font-mono text-[10px] uppercase text-muted-foreground">Laptops · Workspaces · Procurement · IT Setup</p>
          </div>
          <div className="relative hidden min-h-[650px] overflow-hidden bg-primary p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-center">
            <div className="absolute inset-0 opacity-15 technical-grid" />
            <div className="relative border border-primary-foreground/25 bg-primary p-6">
              <div className="mb-12 flex items-center justify-between font-mono text-[10px] uppercase text-primary-foreground/55"><span>Workspace / 001</span><span className="text-accent">Ready to configure</span></div>
              <div className="aspect-[4/2.5] border border-primary-foreground/30 p-5">
                <div className="h-full border border-primary-foreground/20 p-4"><div className="h-full scan-line opacity-25" /></div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">{["SOURCE", "CHECK", "SETUP"].map((item, i) => <div key={item} className="border border-primary-foreground/20 p-3 font-mono text-[9px]"><span className="mr-2 text-accent">0{i + 1}</span>{item}</div>)}</div>
            </div>
            <ArrowDown className="absolute bottom-8 right-8 size-5 text-accent" />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card"><div className="mx-auto grid max-w-7xl px-5 py-24 lg:grid-cols-2 lg:px-10 lg:py-32"><div><SectionLabel>the problem</SectionLabel><h2 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl">You have a company to build.<br />You shouldn't have to hunt for hardware.</h2></div><div className="mt-10 max-w-xl lg:mt-24"><p className="leading-7 text-muted-foreground">Finding good refurbished technology can mean comparing dozens of listings, negotiating with sellers, checking hardware condition and worrying about what happens after purchase.</p><p className="mt-6 text-xl font-semibold">NivaTech simplifies the process.</p><p className="mt-2 leading-7 text-muted-foreground">Tell us what you need. Tell us your budget. We'll help build the setup.</p></div></div></section>

      <section id="services" className="border-b border-border"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32"><SectionLabel>what we do</SectionLabel><h2 className="mb-14 text-4xl font-bold sm:text-6xl">Everything you need<br />to get to work.</h2><div className="grid border-l border-t border-border md:grid-cols-2">{services.map(([n,title,copy]) => <article key={n} className="group min-h-64 border-b border-r border-border bg-card p-7 transition-colors hover:bg-secondary sm:p-9"><div className="flex items-start justify-between"><span className="font-mono text-xs text-muted-foreground">{n}</span><ArrowRight className="size-4 text-accent transition-transform group-hover:translate-x-1" /></div><h3 className="mt-14 text-2xl font-bold">{title}</h3><p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">{copy}</p></article>)}</div></div></section>

      <section id="process" className="border-b border-border bg-primary text-primary-foreground"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32"><p className="mb-6 font-mono text-[10px] font-bold uppercase text-accent">// How it works</p><h2 className="mb-16 text-4xl font-bold sm:text-6xl">From requirement<br />to ready-to-work.</h2><div className="grid border-l border-t border-primary-foreground/20 lg:grid-cols-4">{steps.map(([n,title,copy]) => <article key={n} className="border-b border-r border-primary-foreground/20 p-7"><span className="font-mono text-xs text-accent">{n}</span><h3 className="mt-16 text-xl font-bold">{title}</h3><p className="mt-4 text-sm leading-6 text-primary-foreground/60">{copy}</p></article>)}</div></div></section>

      <section id="why" className="border-b border-border"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32"><SectionLabel>why nivatech</SectionLabel><h2 className="mb-16 text-4xl font-bold sm:text-6xl">Less hardware hunting.<br />More building.</h2><div className="grid gap-px bg-border lg:grid-cols-3">{[["Budget conscious","Access capable technology without automatically paying new-device prices."],["Carefully checked","Every device goes through an inspection process before delivery."],["One point of contact","From recommendation to procurement and setup, work with one team."]].map(([title,copy],i) => <article key={title} className="bg-background p-8 sm:p-10"><span className="font-mono text-xs text-accent">0{i+1}</span><h3 className="mt-20 text-2xl font-bold">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}</div></div></section>

      <section className="border-b border-border bg-secondary"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-10"><SectionLabel>who we serve</SectionLabel><div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">{[["Solo Founders","A reliable machine to get started."],["Early-Stage Startups","Equip your first employees without unnecessary expenditure."],["Small Teams","Multiple laptops, monitors and complete workstation setups."],["Student Entrepreneurs","Practical technology for building, learning and experimenting."]].map(([title,copy]) => <div key={title}><h3 className="border-t border-foreground pt-5 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div></div></section>

      <section className="border-b border-border bg-card"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-10"><SectionLabel>our founders' ecosystem</SectionLabel><div className="grid gap-10 lg:grid-cols-2"><div><h2 className="text-4xl font-bold sm:text-5xl">Rooted in ambitious communities.</h2><p className="mt-5 max-w-xl leading-7 text-muted-foreground">Our founders have experience across leading institutions and professional environments.</p></div><div className="grid grid-cols-2 border-l border-t border-border sm:grid-cols-3">{["AIM Bathinda","PAU Ludhiana","PEC Chandigarh","PGI Chandigarh","GNDU Amritsar"].map(name => <div key={name} className="grid min-h-24 place-items-center border-b border-r border-border p-4 text-center text-sm font-semibold">{name}</div>)}</div></div></div></section>

      <section className="border-b border-border bg-primary text-primary-foreground"><div className="mx-auto grid max-w-7xl lg:grid-cols-[.8fr_1.2fr]"><div className="px-5 py-24 lg:px-10 lg:py-32"><p className="mb-6 font-mono text-[10px] uppercase text-accent">// Device inspection</p><h2 className="text-4xl font-bold sm:text-6xl">Every device<br />gets checked.</h2><p className="mt-8 max-w-md text-lg leading-7 text-primary-foreground/65">We don't expect you to know what to check. That's our job.</p></div><div className="border-primary-foreground/20 px-5 pb-24 lg:border-l lg:p-16"><div className="border border-primary-foreground/25"><div className="flex items-center justify-between border-b border-primary-foreground/25 p-5"><span className="font-mono text-xs font-bold">NIV-DEVICE-CHECK</span><span className="font-mono text-[10px] text-accent">INSPECTION LIST</span></div><div className="grid grid-cols-2 sm:grid-cols-3">{checks.map(check => <div key={check} className="flex items-center justify-between border-b border-r border-primary-foreground/15 p-4 text-xs"><span>{check}</span><Check className="size-4 text-accent" /></div>)}</div></div></div></div></section>

      <section id="founders" className="border-b border-border"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32"><SectionLabel>the people behind nivatech</SectionLabel><div className="grid gap-10 lg:grid-cols-2"><div><h2 className="text-4xl font-bold sm:text-5xl">Built by people who understand technology — and ambitious starts.</h2></div><div className="grid gap-px bg-border sm:grid-cols-2"><article className="bg-card p-7"><div className="mb-16 grid size-16 place-items-center border border-border bg-secondary font-display text-xl font-bold">KK</div><h3 className="text-2xl font-bold">Kartikae Khurana</h3><p className="mt-2 text-sm text-muted-foreground">Co-founder · Software Engineer</p><p className="mt-4 text-sm leading-6 text-muted-foreground">Technology practitioner with experience in software engineering and an academic foundation at GNDU.</p><a href="https://www.linkedin.com/in/kartikae-khurana-631679164" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-bold hover:text-accent"><Linkedin className="size-4" /> LinkedIn</a></article><article className="bg-card p-7"><div className="mb-16 grid size-16 place-items-center border border-border bg-secondary font-display text-xl font-bold">SW</div><h3 className="text-2xl font-bold">Samit Wadhwa</h3><p className="mt-2 text-sm text-muted-foreground">Co-founder · Software Engineer & Creator</p><p className="mt-4 text-sm leading-6 text-muted-foreground">Software engineer and technology creator behind Samit Knows, focused on making technology more accessible.</p><div className="mt-6 flex gap-5"><a href="https://www.linkedin.com/in/samit-wadhwa-62b9771b4" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold hover:text-accent"><Linkedin className="size-4" /> LinkedIn</a><a href="https://www.instagram.com/samitknows/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold hover:text-accent"><Instagram className="size-4" /> Instagram</a></div></article></div></div></div></section>

      <section id="contact" className="border-b border-border bg-card"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32"><div className="mb-16 max-w-4xl"><SectionLabel>start a conversation</SectionLabel><h2 className="text-5xl font-bold sm:text-7xl">Tell us what<br />you're building.</h2><p className="mt-6 max-w-2xl text-lg leading-7 text-muted-foreground">Tell us about your team, your work and your budget. We'll help you figure out the technology you actually need.</p></div>{status === "success" ? <div className="border border-border bg-secondary p-10 sm:p-16"><div className="mb-6 grid size-14 place-items-center bg-accent"><Check className="size-6 text-accent-foreground" /></div><h3 className="text-3xl font-bold">Thanks — we've received your requirements.</h3><p className="mt-3 text-muted-foreground">We'll be in touch shortly.</p><Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>Send another request</Button></div> : <form onSubmit={handleSubmit} noValidate className="grid gap-x-6 gap-y-7 lg:grid-cols-2">{[["name","Name","text"],["email","Email","email"],["phone","Phone / WhatsApp","tel"],["company","Company / Startup","text"],["city","City","text"],["people_count","Number of people","number"]].map(([name,label,type]) => <Field key={name} name={name} label={label} type={type} error={errors[name]} />)}<SelectField name="looking_for" label="What are you looking for?" error={errors.looking_for} options={["One laptop","Multiple laptops","Complete workspace","Monitors & peripherals","IT setup","Other"]} /><SelectField name="budget" label="Approximate budget" error={errors.budget} options={["Under ₹25,000","₹25,000–₹50,000","₹50,000–₹1,00,000","₹1,00,000–₹2,50,000","₹2,50,000+","Not sure yet"]} /><label className="lg:col-span-2"><span className="mb-2 block text-xs font-bold">Tell us what you need</span><textarea name="requirements" rows={6} aria-invalid={Boolean(errors.requirements)} className="w-full border border-input bg-background p-4 text-sm outline-none transition-colors focus:border-accent" />{errors.requirements && <span className="mt-2 block text-xs text-destructive">{errors.requirements}</span>}</label><div className="flex flex-col items-start gap-3 lg:col-span-2"><Button size="lg" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request a Recommendation"}<ArrowRight className="size-4" /></Button>{status === "error" && <p role="alert" className="text-sm text-destructive">We couldn't save your request. Please try again.</p>}</div></form>}</div></section>

      <footer className="bg-primary text-primary-foreground"><div className="mx-auto max-w-7xl px-5 py-12 lg:px-10"><div className="grid gap-12 border-b border-primary-foreground/20 pb-12 lg:grid-cols-2"><div><div className="flex items-center gap-3"><Mark /><span className="font-display text-2xl font-bold">NivaTech</span></div><p className="mt-4 text-sm text-primary-foreground/55">Technology for ambitious beginnings.</p></div><div className="grid grid-cols-2 gap-5 text-xs sm:grid-cols-3">{[["services","What We Do"],["process","How It Works"],["why","Why NivaTech"],["contact","Contact"]].map(([id,label]) => <button key={id} onClick={() => jump(id)} className="text-left hover:text-accent">{label}</button>)}<span className="text-primary-foreground/35">LinkedIn</span><span className="text-primary-foreground/35">Instagram</span></div></div><div className="flex flex-col justify-between gap-3 pt-7 font-mono text-[9px] uppercase text-primary-foreground/40 sm:flex-row"><span>© 2026 NivaTech. All rights reserved.</span><span>Source · Check · Configure · Deliver</span></div></div></footer>
    </main>
  );
}

function Field({ name, label, type, error }: { name: string; label: string; type: string; error?: string }) {
  return <label><span className="mb-2 block text-xs font-bold">{label}</span><input name={name} type={type} min={type === "number" ? 1 : undefined} aria-invalid={Boolean(error)} className="h-13 w-full border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-accent" />{error && <span className="mt-2 block text-xs text-destructive">{error}</span>}</label>;
}

function SelectField({ name, label, options, error }: { name: string; label: string; options: string[]; error?: string }) {
  return <label><span className="mb-2 block text-xs font-bold">{label}</span><select name={name} defaultValue="" aria-invalid={Boolean(error)} className="h-13 w-full border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-accent"><option value="" disabled>Select an option</option>{options.map(option => <option key={option}>{option}</option>)}</select>{error && <span className="mt-2 block text-xs text-destructive">{error}</span>}</label>;
}
