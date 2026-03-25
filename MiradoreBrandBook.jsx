import { useState, useEffect, useRef } from "react";

const C = {
  bk:"#0C0C0C", fd:"#0B1215", ch:"#1A1A1A", dg:"#2A2A2A", mg:"#777", gy:"#999",
  lg:"#BBB", ow:"#E8E4DE", wh:"#F5F4F0", pw:"#FFF",
  or:"#FF6B35", od:"#E85D2C", om:"#CC5A2E",
  tl:"#00E5CC", td:"#00B8A3", tm:"#008F7E", tk:"#005F58",
  gd:"#C9A84C", ma:"#FF00AA", cr:"#F5F0E8",
  iv:"#FAF8F4"
};

const F = {
  d:"'Syne',sans-serif", e:"'DM Serif Display',Georgia,serif",
  b:"'DM Sans',sans-serif", m:"'Space Mono',monospace"
};

const GR = `linear-gradient(135deg,${C.or},${C.tl})`;
const GT: React.CSSProperties = { backgroundImage:GR, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", color:"transparent" };

const IMG = {
  cover:"assets/cover-waveform.jpg",
  s05Hero:"assets/s05-hero.jpg", s05Events:"assets/s05-events.jpg", s05Labs:"assets/s05-labs.jpg",
  s05Weddings:"assets/s05-weddings.jpg", s05Heartbeat:"assets/s05-heartbeat.jpg",
  s05Cityscape:"assets/s05-cityscape.jpg", s05Concert:"assets/s05-concert.jpg", s05Streaming:"assets/s05-streaming.jpg",
  s06Smoke:"assets/s06-smoke.jpg", s06Liquid:"assets/s06-liquid.jpg", s06Hands:"assets/s06-hands.jpg",
  s06Particle:"assets/s06-particle.jpg", s06Portal:"assets/s06-portal.jpg", s06Holographic:"assets/s06-holographic.jpg",
  s06Golden:"assets/s06-golden.jpg", s06Lighttrails:"assets/s06-lighttrails.jpg",
  emblemOrange:"assets/emblem-orange.png", emblemTransparent:"assets/emblem-transparent.png",
};

const SECS = [
  {id:"cover",l:"Cover"},{id:"s01",l:"S01"},{id:"s02",l:"S02"},{id:"s03",l:"S03"},
  {id:"s04",l:"S04"},{id:"s05",l:"S05"},{id:"s06",l:"S06"},{id:"s07",l:"S07"},
  {id:"s10",l:"S10"},{id:"social",l:"S15"},{id:"applied",l:"S13"},{id:"end",l:"End"}
];

const Emblem = ({color="white",size=48}: {color?:string,size?:number}) => {
  const isWhite = color === "white" || color === C.pw;
  const isOrange = color === C.or;
  const filter = isWhite
    ? "invert(1)"
    : isOrange
    ? "invert(42%) sepia(93%) saturate(1500%) hue-rotate(351deg) brightness(100%) contrast(101%)"
    : "none";
  return <img src="assets/emblem-only.png" alt="Miradore" width={size} height={size} style={{filter,display:"block",objectFit:"contain"}} />;
};

const Waveform = ({h=200,variant="hero",opacity=0.5}: {h?:number,variant?:string,opacity?:number}) => {
  const palettes: Record<string, string[]> = {
    hero: [C.or,C.tl,C.or,C.tl],
    events: [C.tl,C.or,C.tl,C.td],
    labs: [C.ma,C.tl,C.ma,C.tl],
    weddings: [C.gd,"#D4B86A",C.gd,"#BFA044"],
    heartbeat: [C.tl,C.or,C.tl,C.or],
  };
  const cols = palettes[variant] || palettes.hero;
  return (
    <div style={{width:"100%",height:h,position:"relative",overflow:"hidden",background:C.bk}}>
      {cols.map((c,i) => (
        <div key={i} style={{
          position:"absolute",
          bottom: `${i*15-10}%`,
          left:"-5%", width:"110%", height:"60%",
          background:`radial-gradient(ellipse at ${25+i*20}% ${50+i*10}%, ${c}${Math.round(opacity*255).toString(16).padStart(2,'0')}, transparent 70%)`,
          filter:"blur(40px)",
          transform:`rotate(${-2+i*1.5}deg)`,
        }}/>
      ))}
      {[...Array(8)].map((_,i) => (
        <div key={`l${i}`} style={{
          position:"absolute",
          top:`${10+i*11}%`,
          left:0,right:0,
          height:1,
          background:`linear-gradient(90deg, transparent 0%, ${cols[i%4]}${Math.round(opacity*0.4*255).toString(16).padStart(2,'0')} 30%, ${cols[(i+1)%4]}${Math.round(opacity*0.3*255).toString(16).padStart(2,'0')} 70%, transparent 100%)`,
        }}/>
      ))}
    </div>
  );
};

const A = ({id}: {id:string}) => <div id={id} style={{scrollMarginTop:56}}/>;
const Lb = ({children}: {children:React.ReactNode}) => <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.15em",color:C.or,marginBottom:12,marginTop:32}}>{children}</div>;
const Bd = ({children,mw=640}: {children:React.ReactNode,mw?:number}) => <div style={{fontFamily:F.b,fontSize:14,lineHeight:1.7,color:C.lg,marginBottom:24,maxWidth:mw}}>{children}</div>;
const Rl = ({my=32}: {my?:number}) => <div style={{width:"100%",height:1,background:C.dg,margin:`${my}px 0`}}/>;

const Br = ({line1,line2,img}: {line1?:string,line2?:string,img?:string}) => (
  <div style={{position:"relative",width:"100vw",marginLeft:"calc(-50vw + 50%)",overflow:"hidden",height:280}}>
    {img ? <img src={img} alt="" loading="lazy" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/> : <Waveform h={280} variant="heartbeat" opacity={0.25}/>}
    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(12,12,12,0.5) 0%,rgba(12,12,12,0.3) 50%,rgba(12,12,12,0.5) 100%)"}}/>
    <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"0 24px"}}>
      <div style={{background:"radial-gradient(ellipse at center,rgba(12,12,12,0.7) 0%,rgba(12,12,12,0.3) 60%,transparent 85%)",padding:"40px 60px",borderRadius:8}}>
        {line1 && <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:"clamp(14px,2.2vw,22px)",color:C.tl,marginBottom:8,textAlign:"center"}}>{line1}</div>}
        {line2 && <div style={{fontFamily:F.d,fontWeight:800,fontSize:"clamp(32px,7vw,80px)",lineHeight:0.95,textAlign:"center",...GT}}>{line2}</div>}
      </div>
    </div>
  </div>
);

const SH = ({num,title,sub}: {num:string,title:string,sub:string}) => (
  <div style={{paddingTop:80}}>
    <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.2em",color:C.tl,marginBottom:8}}>{num}</div>
    <h2 style={{fontFamily:F.d,fontWeight:800,fontSize:"clamp(36px,5vw,56px)",lineHeight:0.95,margin:"0 0 8px",...GT}}>{title}</h2>
    <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:18,color:C.ow,marginBottom:48}}>{sub}</div>
  </div>
);

const EasingDemo = ({name,curve,color=C.tl}: {name:string,curve:string,color?:string}) => {
  const [play,setPlay] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setPlay(true); },{threshold:0.5});
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  },[]);
  return (
    <div ref={ref} style={{padding:20,background:C.fd,borderRadius:10,border:`1px solid ${C.dg}`}}>
      <div style={{fontFamily:F.d,fontWeight:800,fontSize:16,color:C.pw,marginBottom:4}}>{name}</div>
      <div style={{fontFamily:F.m,fontSize:10,color:C.tl,marginBottom:12}}>{curve}</div>
      <div style={{height:6,background:C.ch,borderRadius:3,overflow:"hidden",position:"relative"}}>
        <div style={{
          position:"absolute",top:0,left:0,bottom:0,
          width: play ? "100%" : "0%",
          background: color,
          borderRadius:3,
          transition: `width 1.2s ${curve}`,
        }}/>
      </div>
    </div>
  );
};

export default function App() {
  const [active, setActive] = useState("cover");

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, {threshold:0.15, rootMargin:"-56px 0px -40% 0px"});
    SECS.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <div style={{background:C.bk,minHeight:"100vh",color:C.pw,overflowX:"hidden"}}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{margin:0;padding:0;background:${C.bk}}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${C.bk}}::-webkit-scrollbar-thumb{background:${C.dg};border-radius:2px}@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}@keyframes slideIn{from{width:0}to{width:100%}}`}</style>

      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:`${C.bk}ee`,backdropFilter:"blur(12px)",display:"flex",alignItems:"center",gap:4,padding:"10px 16px",overflowX:"auto",borderBottom:`1px solid ${C.dg}44`}}>
        <span style={{display:"flex",alignItems:"center",gap:8,marginRight:16,flexShrink:0}}>
          <Emblem color={C.or} size={20}/>
          <span style={{fontFamily:F.d,fontWeight:800,fontSize:12,letterSpacing:"0.12em",color:C.or}}>MIRADORE</span>
        </span>
        {SECS.map(s => (
          <button key={s.id} onClick={() => go(s.id)} style={{
            background:active===s.id?`${C.tl}18`:"transparent",
            border:`1px solid ${active===s.id?C.tl+"44":"transparent"}`,
            borderRadius:100,padding:"5px 12px",cursor:"pointer",flexShrink:0,
            fontFamily:F.b,fontSize:11,fontWeight:600,color:active===s.id?C.tl:C.mg
          }}>{s.l}</button>
        ))}
      </nav>

      <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px"}}>

        <A id="cover"/>
        <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",position:"relative",width:"100vw",marginLeft:"calc(-50vw + 50%)",background:C.bk}}>
          <div style={{flex:1}}/>
          <div style={{padding:"0 clamp(24px,5vw,80px)",paddingBottom:24}}>
            <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.3em",color:C.lg,marginBottom:24,animation:"fadeUp 0.8s ease-out"}}>BRAND OPERATING SYSTEM 2026</div>
            <h1 style={{fontFamily:F.d,fontWeight:800,fontSize:"clamp(38px,8.5vw,110px)",lineHeight:0.9,letterSpacing:"-0.02em",margin:0,...GT,animation:"fadeUp 1s ease-out 0.2s both"}}>MIRADORE</h1>
            <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:"clamp(20px,3.5vw,36px)",color:C.ow,marginTop:20,marginBottom:32,animation:"fadeUp 1s ease-out 0.4s both"}}>Designed to be felt.</div>
            <div style={{width:"clamp(200px,80%,600px)",height:3,background:GR,borderRadius:2,marginBottom:48,animation:"slideIn 1.4s cubic-bezier(0.16,1,0.3,1) 0.6s both"}}/>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"flex-start",gap:"clamp(24px,5vw,100px)",padding:"0 clamp(24px,5vw,80px)",paddingBottom:24}}>
            {[{n:"500+",l:"EVENTS PRODUCED"},{n:"3",l:"COUNTRIES"},{n:"19",l:"YEARS OF CRAFT"},{n:"56",l:"NATIONS HOSTED"},{n:"6",l:"DIVISIONS"}].map(s => (
              <div key={s.l}>
                <div style={{fontFamily:F.d,fontWeight:800,fontSize:"clamp(24px,4.5vw,44px)",lineHeight:1,...GT}}>{s.n}</div>
                <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.12em",color:C.gy,marginTop:4}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{position:"relative",width:"100%",height:240,overflow:"hidden"}}>
            <img src={IMG.cover} alt="" loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}/>
          </div>
        </div>

        <Br line1="We don't just produce events." line2="WE ARCHITECT THEM." img={IMG.s06Smoke}/>

        <div style={{padding:"48px 0",maxWidth:640}}>
          <Bd>We started with a room and a deadline. Nineteen years later, we have produced over five hundred events across three countries. The ambition never changed. Only the scale.</Bd>
        </div>

        <A id="s01"/>
        <SH num="S01" title="Foundation." sub="The ground everything stands on."/>
        <Lb>POSITIONING</Lb>
        <div style={{fontFamily:F.d,fontWeight:800,fontSize:"clamp(32px,5vw,52px)",lineHeight:1,...GT,marginBottom:24}}>Designed to be felt.</div>
        <Bd>Every room has a feeling before anyone speaks. The temperature of the light. The weight of the silence. The way a threshold makes you pause. We build that feeling. We have spent nineteen years learning what makes a room hold its breath, what makes an audience lean forward, what makes a government trust you with the room where history gets made. Three cities. Four divisions. One standard. The experience is the product. Everything else is scaffolding.</Bd>
        <div style={{margin:"56px 0",padding:"40px 0",borderTop:`1px solid ${C.dg}`,borderBottom:`1px solid ${C.dg}`}}>
          <div style={{maxWidth:600,borderLeft:`3px solid ${C.or}`,paddingLeft:24}}>
            {[{i:"We don't plan events.",b:"We produce them."},{i:"We don't follow trends.",b:"We set the frequency."},{i:"We don't hand over a deck.",b:"We build the room."}].map((line,idx) => (
              <div key={idx} style={{marginBottom:idx<2?24:0}}>
                <span style={{fontFamily:F.e,fontStyle:"italic",fontSize:"clamp(15px,2vw,20px)",color:C.tl}}>{line.i} </span>
                <span style={{fontFamily:F.d,fontWeight:800,fontSize:"clamp(18px,2.5vw,26px)",color:C.pw}}>{line.b}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{width:"100vw",marginLeft:"calc(-50vw + 50%)",position:"relative",marginBottom:48,overflow:"hidden",height:200}}>
          <img src={IMG.s05Events} alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:0.35}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(12,12,12,0.4) 0%,rgba(12,12,12,0.2) 50%,rgba(12,12,12,0.4) 100%)"}}/>
          <div style={{position:"absolute",inset:0,display:"flex",justifyContent:"center",gap:"clamp(32px,6vw,80px)",alignItems:"center"}}>
            {[{n:"500+",l:"Events produced"},{n:"56",l:"Nations hosted"},{n:"19",l:"Years of craft"}].map(s => (
              <div key={s.l} style={{textAlign:"center"}}>
                <div style={{fontFamily:F.d,fontWeight:800,fontSize:"clamp(44px,7vw,72px)",lineHeight:1,...GT}}>{s.n}</div>
                <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:"clamp(11px,1.4vw,16px)",color:C.ow}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <Rl/>
        <Lb>VALUES</Lb>
        <div style={{display:"grid",gap:0,marginBottom:48}}>
          {[{v:"Precision",d:"56 nations. One room. Zero errors.",c:C.tl},{v:"Craft",d:"Built by hand. Not by template.",c:C.or},{v:"Boldness",d:"First in the room. Last to leave.",c:C.tl},{v:"Innovation",d:"The technology nobody expected.",c:C.or},{v:"Scale",d:"A head of state or 34,000 fans. Same standard.",c:C.tl}].map((item,i) => (
            <div key={item.v} style={{display:"flex",gap:16,padding:"18px 0",borderBottom:`1px solid ${C.dg}`}}>
              <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.1em",color:item.c,minWidth:20}}>0{i+1}</div>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:16,color:C.pw,minWidth:120}}>{item.v}</div>
              <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:15,color:C.lg}}>{item.d}</div>
            </div>
          ))}
        </div>

        <Lb>BRAND ARCHITECTURE</Lb>
        <div style={{background:C.fd,borderRadius:16,padding:32,marginBottom:48,border:`1px solid ${C.dg}`}}>
          <div style={{textAlign:"center",marginBottom:32}}>
            <Emblem color={C.or} size={36}/>
            <div style={{fontFamily:F.d,fontWeight:800,fontSize:20,...GT,marginTop:8}}>MIRADORE</div>
            <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:13,color:C.ow}}>Master Brand</div>
          </div>
          <div style={{width:2,height:32,background:GR,margin:"0 auto 24px"}}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12}}>
            {[
              {n:"Events",c:C.tl,rel:"ENDORSED",note:"Miradore Events"},
              {n:"Creative Agency",c:C.or,rel:"ENDORSED",note:"Miradore Creative"},
              {n:"Weddings",c:C.gd,rel:"ENDORSED",note:"Miradore Weddings"},
              {n:"Labs Immersive",c:C.ma,rel:"ENDORSED",note:"Miradore Labs"},
              {n:"Arabia",c:C.tl,rel:"EXTENSION",note:"Miradore Arabia (KSA)"},
              {n:"ROX Concerts",c:C.gy,rel:"INDEPENDENT",note:"Own identity system"},
            ].map(d => (
              <div key={d.n} style={{padding:16,background:C.bk,borderRadius:10,borderTop:`3px solid ${d.c}`,textAlign:"center"}}>
                <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.15em",color:d.c,marginBottom:6}}>{d.rel}</div>
                <div style={{fontFamily:F.d,fontWeight:800,fontSize:13,color:C.pw,marginBottom:4}}>{d.n}</div>
                <div style={{fontFamily:F.b,fontSize:11,color:C.gy,lineHeight:1.3}}>{d.note}</div>
              </div>
            ))}
          </div>
          <div style={{fontFamily:F.m,fontSize:10,color:C.mg,marginTop:16,textAlign:"center"}}>ENDORSED = uses Miradore name + master system. INDEPENDENT = own logo, own rules.</div>
        </div>

        <Lb>CREDENTIALS</Lb>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,marginBottom:48}}>
          {[{t:"Head of State",e:"OIC 48th Council of Foreign Ministers. Hosted Chinese President at CPEC groundbreaking. Multiple World Bank summits. PM-level attendance."},{t:"Defence + Diplomacy",e:"Central and South Asia Chiefs of Defence Conference. SCO Summit. Margalla Dialogue."},{t:"Industry Firsts",e:"APICTA Awards. DFDI 2026. Pakistan FinTech Summit."},{t:"Multi-year Partnerships",e:"Jazz/Veon (6+ years, 20+ events). S&P Global. Green Group Dubai."}].map(c => (
            <div key={c.t} style={{padding:18,background:C.fd,borderRadius:10,borderLeft:`2px solid ${C.tl}`}}>
              <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.12em",color:C.tl,marginBottom:8}}>{c.t.toUpperCase()}</div>
              <div style={{fontFamily:F.b,fontSize:13,color:C.lg,lineHeight:1.5}}>{c.e}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
          {["OIC","World Bank","CPEC","S&P Global","Jazz/Veon","UNICEF","UN Women","USAID","Google","Samsung","Ericsson","P@SHA","REAP International","Embassy of Ireland"].map(name => (
            <span key={name} style={{padding:"5px 14px",borderRadius:100,border:`1px solid ${C.dg}`,fontFamily:F.m,fontSize:10,color:C.gy}}>{name}</span>
          ))}
        </div>
        <Br line1="500+ events. 3 countries." line2="FELT." img={IMG.s05Concert}/>

        <A id="s02"/>
        <SH num="S02" title="Logo." sub="Direction. Precision. Tension before release."/>
        <Lb>EMBLEM</Lb>
        <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
          <div style={{width:"clamp(200px,40vw,320px)",height:"clamp(200px,40vw,320px)",background:C.fd,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${C.dg}`}}>
            <Emblem color={C.or} size={160}/>
          </div>
        </div>
        <Bd>The Miradore emblem is a bow and arrow. Direction, precision, the tension before release. It represents the moment before impact, when every detail has been calibrated and the only thing left is execution.</Bd>
        <Rl/>
        <Lb>CLEAR SPACE</Lb>
        <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
          <div style={{position:"relative",width:200,height:200}}>
            <div style={{position:"absolute",inset:40,display:"flex",alignItems:"center",justifyContent:"center"}}><Emblem color={C.or} size={100}/></div>
            <div style={{position:"absolute",inset:24,border:`1px dashed ${C.tl}66`,borderRadius:8}}/>
            {(["top","bottom","left","right"] as const).map(pos => (
              <div key={pos} style={{position:"absolute",...(pos==="top"?{top:8,left:"50%",transform:"translateX(-50%)"}:pos==="bottom"?{bottom:8,left:"50%",transform:"translateX(-50%)"}:pos==="left"?{left:8,top:"50%",transform:"translateY(-50%)"}:{right:8,top:"50%",transform:"translateY(-50%)"}),fontFamily:F.m,fontSize:10,color:C.tl}}>X</div>
            ))}
          </div>
        </div>
        <Bd mw={400}>Minimum clear space equals the height of the arrowhead (X). No text, imagery, or other elements may enter this zone.</Bd>
        <Rl/>
        <Lb>WORDMARK</Lb>
        <div style={{fontFamily:F.d,fontWeight:800,fontSize:"clamp(32px,6vw,72px)",letterSpacing:"-0.02em",...GT,textAlign:"center",marginBottom:24}}>MIRADORE</div>
        <Bd>Four approved treatments. Orange on dark is the primary, most-used version.</Bd>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:32}}>
          {[{bg:C.bk,label:"Orange on dark (primary)",ws:{color:C.or},border:true},{bg:C.bk,label:"Gradient on dark",ws:GT,border:true},{bg:C.wh,label:"Flat teal on light",ws:{color:C.tl}},{bg:C.cr,label:"Flat gold (Weddings)",ws:{color:C.gd}}].map(t => (
            <div key={t.label} style={{background:t.bg,borderRadius:12,padding:"20px 16px",textAlign:"center",border:t.border?`1px solid ${C.dg}`:"none"}}>
              <div style={{fontFamily:F.b,fontWeight:700,fontSize:"clamp(14px,1.5vw,18px)",letterSpacing:"0.14em",...t.ws,marginBottom:8}}>MIRADORE</div>
              <div style={{fontFamily:F.m,fontSize:10,color:t.bg===C.bk?C.gy:C.mg}}>{t.label}</div>
            </div>
          ))}
        </div>
        <Rl/>
        <Lb>CO-BRANDING LOCKUPS</Lb>
        <Bd>When Miradore appears alongside client or partner brands, these rules maintain hierarchy and clear space.</Bd>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12,marginBottom:32}}>
          {[
            {t:"do",text:"Client logo left, Miradore right. Separated by a thin vertical rule (1px, 50% opacity)."},
            {t:"do",text:"Equal height. Both logos optically matched. Miradore wordmark always in orange or gradient."},
            {t:"do",text:"Clear space between logos is minimum 2x the arrowhead height (2X)."},
            {t:"dont",text:"Never stack Miradore below a client logo. Horizontal lockup only."},
            {t:"dont",text:"Never recolour the Miradore wordmark to match a client palette."},
            {t:"dont",text:"Never combine Miradore and ROX logos in one lockup."},
          ].map((r,i) => (
            <div key={i} style={{padding:16,background:C.fd,borderRadius:8,borderLeft:`3px solid ${r.t==="do"?C.tl:C.or}`}}>
              <div style={{fontFamily:F.m,fontSize:10,color:r.t==="do"?C.tl:C.or,marginBottom:6}}>{r.t==="do"?"DO":"DON'T"}</div>
              <div style={{fontFamily:F.b,fontSize:13,color:C.lg,lineHeight:1.5}}>{r.text}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"center",marginBottom:48}}>
          <div style={{background:C.fd,borderRadius:12,padding:"24px 40px",display:"flex",alignItems:"center",gap:24,border:`1px solid ${C.dg}`}}>
            <div style={{fontFamily:F.b,fontSize:16,fontWeight:700,color:C.lg,letterSpacing:"0.05em"}}>CLIENT</div>
            <div style={{width:1,height:28,background:`${C.gy}80`}}/>
            <div style={{fontFamily:F.b,fontWeight:700,fontSize:16,letterSpacing:"0.14em",color:C.or}}>MIRADORE</div>
          </div>
        </div>

        <A id="s03"/>
        <div style={{padding:"clamp(60px,10vh,140px) 0",position:"relative",overflow:"hidden",width:"100vw",marginLeft:"calc(-50vw + 50%)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 30% 50%,${C.or}22,transparent 60%),radial-gradient(ellipse at 70% 60%,${C.tl}18,transparent 50%)`}}/>
          <div style={{position:"relative",textAlign:"center",padding:"0 24px"}}>
            <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.2em",color:C.tl,marginBottom:8}}>S03</div>
            <h2 style={{fontFamily:F.d,fontWeight:800,fontSize:"clamp(48px,8vw,100px)",lineHeight:0.9,...GT}}>Colour.</h2>
            <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:"clamp(16px,2.5vw,24px)",color:C.ow,marginTop:8}}>The emotional frequency of every surface.</div>
          </div>
        </div>
        <Lb>PRIMARY PALETTE</Lb>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:32}}>
          {[{n:"Cinema Black",h:"#0C0C0C",p:"55%"},{n:"Signal Orange",h:"#FF6B35",p:"15%"},{n:"Electric Teal",h:"#00E5CC",p:"18%"},{n:"Warm Neutral",h:"#E8E4DE",p:"12%"},{n:"Heritage Gold",h:"#C9A84C",p:"Weddings"}].map(c => (
            <div key={c.n} style={{borderRadius:12,overflow:"hidden",border:`1px solid ${C.dg}`}}>
              <div style={{height:64,background:c.h}}/>
              <div style={{padding:"10px 12px",background:C.fd}}>
                <div style={{fontFamily:F.b,fontSize:12,fontWeight:700,color:C.pw}}>{c.n}</div>
                <div style={{fontFamily:F.m,fontSize:10,color:C.gy}}>{c.h} / {c.p}</div>
              </div>
            </div>
          ))}
        </div>
        <Lb>COLOUR MODES</Lb>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16,marginBottom:48}}>
          {[{name:"Operational",desc:"Quiet. 55% black. Proposals, UI, docs.",bars:[55,18,15,12]},{name:"Expressive",desc:"Bold. 32% black. Social, brand films, events.",bars:[32,28,25,15]}].map(m => (
            <div key={m.name} style={{padding:24,background:C.fd,borderRadius:12,border:`1px solid ${C.dg}`}}>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:18,marginBottom:8,...GT}}>{m.name}</div>
              <div style={{fontFamily:F.b,fontSize:14,color:C.gy,marginBottom:16}}>{m.desc}</div>
              <div style={{display:"flex",gap:3,height:20,borderRadius:4,overflow:"hidden"}}>
                <div style={{flex:m.bars[0],background:C.bk,border:`1px solid ${C.dg}`}}/><div style={{flex:m.bars[1],background:C.tl}}/><div style={{flex:m.bars[2],background:C.or}}/><div style={{flex:m.bars[3],background:C.ow}}/>
              </div>
            </div>
          ))}
        </div>
        <Lb>THE GRADIENT</Lb>
        <div style={{width:"100vw",marginLeft:"calc(-50vw + 50%)",marginBottom:12}}><div style={{height:80,background:GR}}/></div>
        <div style={{fontFamily:F.m,fontSize:10,color:C.gy,marginBottom:32}}>SIGNAL ORANGE #FF6B35 to ELECTRIC TEAL #00E5CC. 135 degree angle. No gold in master brand gradient.</div>
        <Lb>DIVISION COLOUR COMPARISON</Lb>
        <Bd>Same template, different emotional frequency.</Bd>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:48}}>
          {[
            {d:"Events",bg:C.bk,accent:C.tl,secondary:C.or,text:C.pw},
            {d:"Creative",bg:C.bk,accent:C.or,secondary:C.tl,text:C.pw},
            {d:"Weddings",bg:C.cr,accent:C.gd,secondary:"#D4B86A",text:"#2A2218"},
            {d:"Labs",bg:C.bk,accent:C.ma,secondary:C.tl,text:C.pw},
          ].map(dv => (
            <div key={dv.d} style={{background:dv.bg,borderRadius:12,overflow:"hidden",border:`1px solid ${C.dg}`,padding:16}}>
              <div style={{height:4,background:`linear-gradient(90deg,${dv.accent},${dv.secondary})`,borderRadius:2,marginBottom:12}}/>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:16,color:dv.accent,marginBottom:4}}>HEADLINE.</div>
              <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:12,color:dv.text,opacity:0.7,marginBottom:8}}>Subheading text</div>
              <div style={{fontFamily:F.b,fontWeight:700,fontSize:10,letterSpacing:"0.14em",color:dv.accent}}>MIRADORE</div>
              <div style={{fontFamily:F.m,fontSize:10,color:dv.text,opacity:0.4,marginTop:4}}>{dv.d}</div>
            </div>
          ))}
        </div>

        <A id="s04"/>
        <div style={{width:"100vw",marginLeft:"calc(-50vw + 50%)",background:C.iv,padding:"clamp(60px,10vh,140px) clamp(24px,5vw,80px)"}}>
          <div style={{maxWidth:900,margin:"0 auto"}}>
            <div style={{textAlign:"right",marginBottom:64}}>
              <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:"clamp(18px,3vw,28px)",color:C.mg,marginBottom:8}}>Type speaks before</div>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:"clamp(36px,7vw,80px)",lineHeight:0.95,color:C.bk}}>WORDS DO.</div>
            </div>
            <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.2em",color:C.or,marginBottom:8}}>S04</div>
            <h2 style={{fontFamily:F.d,fontWeight:800,fontSize:"clamp(36px,5vw,56px)",lineHeight:0.95,margin:"0 0 48px",color:C.bk}}>Typography.</h2>
            {[
              {num:"01",label:"DISPLAY",title:"Syne 800",sample:"ABCDEFGHIJKLM",sampleStyle:{fontFamily:F.d,fontWeight:800,fontSize:"clamp(28px,5.5vw,60px)",lineHeight:0.95,color:C.bk} as React.CSSProperties,desc:"Headlines H1 and H2 only. Not for body. Not for captions. Set in ExtraBold (800). Always.",titleStyle:{fontFamily:F.d,fontWeight:800,fontSize:"clamp(36px,7vw,80px)",lineHeight:0.95,color:C.bk} as React.CSSProperties},
              {num:"02",label:"EDITORIAL",title:"DM Serif Display Italic",sample:null,sampleStyle:{} as React.CSSProperties,desc:"The whisper register. Subheadings, pull quotes, division subtitles. Always italic. Never bold.",titleStyle:{fontFamily:F.e,fontStyle:"italic",fontSize:"clamp(30px,5vw,56px)",lineHeight:1.1,color:C.mg} as React.CSSProperties},
              {num:"03",label:"BODY",title:"DM Sans Regular",sample:null,sampleStyle:{} as React.CSSProperties,desc:"All body text, captions, and UI elements. Regular and Bold weights. Clean, modern, humanist.",titleStyle:{fontFamily:F.b,fontSize:"clamp(20px,3vw,32px)",lineHeight:1.4,color:C.mg} as React.CSSProperties},
              {num:"04",label:"DATA",title:"Space Mono 400",sample:null,sampleStyle:{} as React.CSSProperties,desc:"Labels, metadata, section numbers, technical information. The system's voice.",titleStyle:{fontFamily:F.m,fontSize:"clamp(18px,2.5vw,28px)",letterSpacing:"0.1em",color:C.or} as React.CSSProperties}
            ].map(f => (
              <div key={f.num} style={{marginBottom:24,padding:"40px 0",borderBottom:`1px solid ${C.bk}15`}}>
                <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.15em",color:C.or,marginBottom:12}}>{f.num} / {f.label}</div>
                <div style={{...f.titleStyle,marginBottom:8}}>{f.title}</div>
                {f.sample && <div style={{...f.sampleStyle}}>{f.sample}</div>}
                <div style={{fontFamily:F.b,fontSize:14,color:C.mg,marginTop:16,maxWidth:480}}>{f.desc}</div>
              </div>
            ))}
            <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.15em",color:C.or,marginBottom:12,marginTop:32}}>TWO-REGISTER SYSTEM</div>
            <div style={{background:C.bk,borderRadius:12,padding:32,marginBottom:48}}>
              <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:"clamp(16px,2.5vw,24px)",color:C.ow,marginBottom:4}}>Designed to be</div>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:"clamp(36px,6vw,72px)",lineHeight:0.95,...GT}}>FELT.</div>
              <div style={{fontFamily:F.m,fontSize:10,color:C.mg,marginTop:20}}>The whisper (DM Serif Display italic) sets context. The declaration (Syne 800) delivers the statement.</div>
            </div>
            <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.15em",color:C.or,marginBottom:12}}>HIERARCHY TABLE</div>
            <div style={{display:"grid",gap:2,marginBottom:48}}>
              {[
                {el:"H1",font:"Syne 800",size:"48-110px",use:"Page titles, hero statements"},
                {el:"H2",font:"Syne 800",size:"36-56px",use:"Section titles"},
                {el:"Subtitle",font:"DM Serif Display Italic",size:"18-28px",use:"Section subtitles, whisper register"},
                {el:"Body",font:"DM Sans Regular",size:"14-16px",use:"Paragraphs, descriptions"},
                {el:"Label",font:"Space Mono 400",size:"9-11px",use:"Section numbers, metadata"},
                {el:"Wordmark",font:"DM Sans Bold",size:"Variable",use:"MIRADORE wordmark only"},
              ].map(r => (
                <div key={r.el} style={{display:"grid",gridTemplateColumns:"60px 180px 80px 1fr",gap:12,padding:"10px 12px",background:`${C.bk}08`,borderRadius:4,alignItems:"center"}}>
                  <div style={{fontFamily:F.m,fontSize:10,color:C.or}}>{r.el}</div>
                  <div style={{fontFamily:F.b,fontSize:12,color:C.bk}}>{r.font}</div>
                  <div style={{fontFamily:F.m,fontSize:10,color:C.mg}}>{r.size}</div>
                  <div style={{fontFamily:F.b,fontSize:12,color:C.mg}}>{r.use}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <A id="s05"/>
        <Br line1="Not decoration." line2="LANGUAGE." img={IMG.s05Hero}/>
        <SH num="S05" title="Pattern." sub="The visual DNA of every surface."/>
        <Lb>EXPRESSIVE PATTERNS</Lb>
        <Bd>Each pattern is generated from the Miradore colour spectrum using Midjourney v8.</Bd>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,marginBottom:48}}>
          {[
            {n:"Primary Hero",img:IMG.s05Hero,c:C.or},{n:"Events",img:IMG.s05Events,c:C.tl},
            {n:"Labs",img:IMG.s05Labs,c:C.ma},{n:"Weddings",img:IMG.s05Weddings,c:C.gd},
            {n:"Heartbeat",img:IMG.s05Heartbeat,c:C.tl},{n:"Concert",img:IMG.s05Concert,c:C.or},
            {n:"Cityscape",img:IMG.s05Cityscape,c:C.tl},{n:"Streaming",img:IMG.s05Streaming,c:C.or},
          ].map(p => (
            <div key={p.n} style={{borderRadius:10,overflow:"hidden",border:`1px solid ${C.dg}`}}>
              <img src={p.img} alt={p.n} loading="lazy" style={{width:"100%",height:140,objectFit:"cover",display:"block"}}/>
              <div style={{padding:"10px 12px",background:C.fd}}>
                <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.1em",color:p.c}}>{p.n.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
        <Lb>USAGE MATRIX</Lb>
        <div style={{display:"grid",gap:6,marginBottom:48}}>
          {[
            {t:"Website hero",p:"Primary Hero"},{t:"Pitch deck cover",p:"Primary Hero"},
            {t:"Social post background",p:"Events / Creative"},{t:"Proposal divider",p:"Events"},
            {t:"Concert promo",p:"Concert"},{t:"Wedding invitation",p:"Weddings Ivory"},
            {t:"Labs showcase",p:"Labs"},{t:"City-specific collateral",p:"Cityscape"},
            {t:"Email signature banner",p:"Heartbeat"},{t:"Business card reverse",p:"Primary Hero"},
            {t:"Event backdrop",p:"Primary Hero (scaled)"},{t:"Digital ad background",p:"Events / Creative"},
          ].map(u => (
            <div key={u.t} style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",background:C.fd,borderRadius:6}}>
              <span style={{fontFamily:F.b,fontSize:12,color:C.lg}}>{u.t}</span>
              <span style={{fontFamily:F.m,fontSize:10,color:C.tl}}>{u.p}</span>
            </div>
          ))}
        </div>

        <A id="s06"/>
        <Br line1="Every image" line2="EARNED." img={IMG.s06Portal}/>
        <SH num="S06" title="Imagery." sub="8 visual directions. One hierarchy."/>
        <Lb>VISUAL HIERARCHY</Lb>
        <Bd>Visual directions are tiered by frequency. PRIMARY appears in 50-60% of content.</Bd>
        {[
          {n:"S05 Waveforms",tier:"PRIMARY",pct:"50-60%",desc:"The default visual language. Generated from the brand colour spectrum.",c:C.or,img:IMG.s06Lighttrails},
          {n:"Smoke + Atmosphere",tier:"TIER 1",pct:"15%",desc:"Luminous fog, volumetric light, theatrical haze.",c:C.tl,img:IMG.s06Smoke},
          {n:"Liquid Light",tier:"TIER 1",pct:"10-15%",desc:"Molten gradients, mercury surfaces, fluid motion.",c:C.or,img:IMG.s06Liquid},
          {n:"Hands / Craft",tier:"TIER 2",pct:"1 in 10",desc:"Close-up human hands building, adjusting, calibrating.",c:C.gd,img:IMG.s06Hands},
          {n:"Particle Universe",tier:"TIER 2",pct:"1 in 10",desc:"Micro-scale particles, dust in light beams, constellation fields.",c:C.tl,img:IMG.s06Particle},
          {n:"Portal",tier:"TIER 3",pct:"Campaign",desc:"Architectural thresholds, light-filled doorways. Campaign launches only.",c:C.ma,img:IMG.s06Portal},
          {n:"Holographic (Labs)",tier:"DIVISION",pct:"Labs",desc:"Iridescent surfaces, holographic textures, refracted light.",c:C.ma,img:IMG.s06Holographic},
          {n:"Golden Hour (Weddings)",tier:"DIVISION",pct:"Weddings",desc:"Warm amber light, soft focus, golden tones.",c:C.gd,img:IMG.s06Golden},
        ].map(d => (
          <div key={d.n} style={{marginBottom:24,borderRadius:12,overflow:"hidden",border:`1px solid ${C.dg}`}}>
            <div style={{position:"relative"}}>
              <img src={d.img} alt={d.n} loading="lazy" style={{width:"100%",height:180,objectFit:"cover",display:"block"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(0deg,rgba(12,12,12,0.7) 0%,transparent 60%)",display:"flex",alignItems:"flex-end",padding:16}}>
                <div>
                  <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.12em",color:d.c,marginBottom:4}}>{d.tier} / {d.pct}</div>
                  <div style={{fontFamily:F.d,fontWeight:800,fontSize:"clamp(18px,3vw,28px)",color:C.pw}}>{d.n}</div>
                </div>
              </div>
            </div>
            <div style={{padding:"12px 16px",background:C.fd}}>
              <div style={{fontFamily:F.b,fontSize:13,color:C.lg,lineHeight:1.5}}>{d.desc}</div>
            </div>
          </div>
        ))}

        <A id="s07"/>
        <Br line1="Nothing moves" line2="WITHOUT PURPOSE." img={IMG.s06Liquid}/>
        <SH num="S07" title="Motion." sub="Choreographed. Never decorative."/>
        <Lb>EASING CURVES</Lb>
        <Bd>Each curve is tuned for a specific emotional register. Scroll to see them animate.</Bd>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12,marginBottom:32}}>
          <EasingDemo name="Entrance" curve="cubic-bezier(0.16,1,0.3,1)" color={C.tl}/>
          <EasingDemo name="Exit" curve="cubic-bezier(0.7,0,0.84,0)" color={C.or}/>
          <EasingDemo name="Emphasis" curve="cubic-bezier(0.34,1.56,0.64,1)" color={C.ma}/>
        </div>
        <Lb>DURATION SCALE</Lb>
        <div style={{display:"grid",gap:4,marginBottom:32}}>
          {[{label:"Micro",ms:"100-200ms",use:"Hover, toggle"},{label:"Standard",ms:"300-400ms",use:"Panel, card, fade"},{label:"Entrance",ms:"600-800ms",use:"Section reveal"},{label:"Dramatic",ms:"1000-1400ms",use:"Full-page transition"},{label:"Cinematic",ms:"1800-2400ms",use:"Title sequence"}].map(d => (
            <div key={d.label} style={{display:"grid",gridTemplateColumns:"80px 100px 1fr",gap:16,padding:"10px 12px",background:C.fd,borderRadius:6,alignItems:"center"}}>
              <div style={{fontFamily:F.b,fontSize:12,fontWeight:700,color:C.pw}}>{d.label}</div>
              <div style={{fontFamily:F.m,fontSize:10,color:C.tl}}>{d.ms}</div>
              <div style={{fontFamily:F.b,fontSize:12,color:C.gy}}>{d.use}</div>
            </div>
          ))}
        </div>
        <Lb>5 REVEAL MECHANICS</Lb>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:32}}>
          {["Fade Up","Wipe Reveal","Scale In","Stagger Cascade","Gradient Sweep"].map(r => (
            <div key={r} style={{padding:"14px 16px",background:C.fd,borderRadius:8,border:`1px solid ${C.dg}`,textAlign:"center"}}>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:13,color:C.pw}}>{r}</div>
            </div>
          ))}
        </div>
        <Lb>MOTION RULES</Lb>
        <div style={{display:"grid",gap:6,marginBottom:48}}>
          {[{n:"01",rule:"Everything eases. No linear motion. Ever."},{n:"02",rule:"Stagger reveals by 80-120ms per element."},{n:"03",rule:"The gradient sweeps left-to-right. Always. Orange resolves to teal."},{n:"04",rule:"Text reveals before images. Type is the architecture."},{n:"05",rule:"The MIRADORE wordmark resolves last. Always."}].map(r => (
            <div key={r.n} style={{display:"flex",gap:12,padding:"10px 12px",background:C.fd,borderRadius:6}}>
              <div style={{fontFamily:F.m,fontSize:10,color:C.tl,minWidth:24}}>{r.n}</div>
              <div style={{fontFamily:F.b,fontSize:13,color:C.lg}}>{r.rule}</div>
            </div>
          ))}
        </div>

        <A id="s10"/>
        <Br line1="Words are" line2="ARCHITECTURE." img={IMG.s05Streaming}/>
        <SH num="S10" title="Voice." sub="How Miradore speaks."/>
        <Lb>7 PRINCIPLES</Lb>
        <div style={{display:"grid",gap:8,marginBottom:48}}>
          {[{p:"Declare, don't qualify",ex:"We produce. (not: We strive to produce high-quality...)"},{p:"Concrete over abstract",ex:"56 nations in one room. (not: A diverse, global gathering.)"},{p:"Short sentences",ex:"Precision takes time. We take it."},{p:"Contrast as structure",ex:"Italic whispers. Bold declares."},{p:"Work speaks, we annotate",ex:"Let the image lead. Copy supports."},{p:"Silence as tool",ex:"White space. Breathing room."},{p:"Warm, not cold",ex:"Craft, not clinical. Human, not mechanical."}].map((v,i) => (
            <div key={v.p} style={{display:"flex",gap:16,padding:16,background:C.fd,borderRadius:8,borderLeft:`3px solid ${i%2===0?C.tl:C.or}`}}>
              <div>
                <div style={{fontFamily:F.d,fontWeight:800,fontSize:14,color:C.pw,marginBottom:4}}>{v.p}.</div>
                <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:13,color:C.gy}}>{v.ex}</div>
              </div>
            </div>
          ))}
        </div>
        <Lb>LOCKED TAGLINES</Lb>
        <div style={{display:"grid",gap:8,marginBottom:48}}>
          {["Designed to be felt.","Every frame. Intentional.","Precision is invisible.","Produced. Not planned.","Where nations meet.","The room remembers."].map(t => (
            <div key={t} style={{padding:"12px 16px",background:C.fd,borderRadius:8}}>
              <span style={{fontFamily:F.e,fontStyle:"italic",fontSize:16,color:C.ow}}>{t}</span>
            </div>
          ))}
        </div>
        <Lb>KILL WORDS</Lb>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:32}}>
          {["Elevating","Perspectives","Synergy","Leverage","Utilize","Optimize","Solutions","Innovative","Cutting-edge","World-class"].map(w => (
            <span key={w} style={{padding:"4px 12px",borderRadius:100,background:`${C.or}22`,fontFamily:F.m,fontSize:10,color:C.or,textDecoration:"line-through"}}>{w}</span>
          ))}
        </div>
        <Lb>POWER WORDS</Lb>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:48}}>
          {["Produced","Engineered","Felt","Crafted","Architected","Calibrated","Built","Assembled","Composed","Directed"].map(w => (
            <span key={w} style={{padding:"4px 12px",borderRadius:100,background:`${C.tl}22`,fontFamily:F.m,fontSize:10,color:C.tl}}>{w}</span>
          ))}
        </div>
        <Lb>BILINGUAL GUIDELINES</Lb>
        <Bd>Dubai, Islamabad, Riyadh. Arabic is a business requirement across all three markets.</Bd>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12,marginBottom:48}}>
          {[
            {t:"do",text:"Arabic text sits in a dedicated zone. Never mixed inline with English."},
            {t:"do",text:"Arabic headlines scale to 120% of the English equivalent for optical weight."},
            {t:"do",text:"RTL layouts mirror the grid. Navigation, reading flow, and alignment all flip."},
            {t:"dont",text:"Never auto-translate taglines. Arabic copy must be locally written and reviewed."},
            {t:"dont",text:"Never set Arabic text below 14px on screen or 10pt in print."},
          ].map((r,i) => (
            <div key={i} style={{padding:16,background:C.fd,borderRadius:8,borderLeft:`3px solid ${r.t==="do"?C.tl:C.or}`}}>
              <div style={{fontFamily:F.m,fontSize:10,color:r.t==="do"?C.tl:C.or,marginBottom:6}}>{r.t==="do"?"DO":"DON'T"}</div>
              <div style={{fontFamily:F.b,fontSize:13,color:C.lg,lineHeight:1.5}}>{r.text}</div>
            </div>
          ))}
        </div>
        <Lb>LANGUAGE RULES</Lb>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12,marginBottom:48}}>
          {[{t:"do",text:"British English throughout. Colour, not color."},{t:"do",text:"Periods on headlines. Every headline ends with a full stop."},{t:"dont",text:"No exclamation marks. Ever."},{t:"dont",text:"No em dashes. Use commas, periods, or line breaks."},{t:"dont",text:"Never say Elevating Perspectives. Killed permanently."}].map((r,i) => (
            <div key={i} style={{padding:16,background:C.fd,borderRadius:8,borderLeft:`3px solid ${r.t==="do"?C.tl:C.or}`}}>
              <div style={{fontFamily:F.m,fontSize:10,color:r.t==="do"?C.tl:C.or,marginBottom:6}}>{r.t==="do"?"DO":"DON'T"}</div>
              <div style={{fontFamily:F.b,fontSize:13,color:C.lg,lineHeight:1.5}}>{r.text}</div>
            </div>
          ))}
        </div>

        <A id="social"/>
        <Br line1="The brand" line2="IN THE WILD." img={IMG.s05Cityscape}/>
        <SH num="S15" title="Social Media." sub="Design system for digital presence."/>
        <Lb>3-LAYER STRUCTURAL SIGNATURE</Lb>
        <div style={{background:C.fd,borderRadius:12,padding:24,marginBottom:48,border:`1px solid ${C.dg}`}}>
          <div style={{display:"grid",gap:12}}>
            {[{num:"01",color:C.or,title:"Image Zone",desc:"AI render or real photo. Full bleed."},{num:"02",color:C.tl,title:"Type Zone",desc:"Syne 800 headline. DM Serif Display subtitle."},{num:"03",color:C.gd,title:"Brand Bar",desc:"MIRADORE gradient wordmark (DM Sans Bold) + cities with periods."}].map(layer => (
              <div key={layer.num} style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:40,height:40,background:`${layer.color}33`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.m,fontSize:10,color:layer.color}}>{layer.num}</div>
                <div><div style={{fontFamily:F.b,fontSize:13,fontWeight:700,color:C.pw}}>{layer.title}</div><div style={{fontFamily:F.b,fontSize:11,color:C.gy}}>{layer.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
        <Lb>11 TYPE MODES</Lb>
        <Bd>Each mode has a specific emotional register and locked font pairing.</Bd>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:12,marginBottom:48}}>
          {[
            {mode:"BOLD",font:F.d,w:800,sz:20,c:C.pw,bg:C.bk,sample:"PRECISION.",sub:"Syne 800 / dark bg"},
            {mode:"SUBTLE",font:F.d,w:800,sz:20,c:C.ch,bg:C.iv,sample:"PRECISION.",sub:"Syne 800 / light bg"},
            {mode:"BREATHE",font:F.e,w:400,sz:18,c:C.gd,bg:C.cr,sample:"Designed to be felt.",sub:"DM Serif Italic / Weddings",italic:true},
            {mode:"FRAME",font:F.d,w:800,sz:18,c:C.pw,bg:C.bk,sample:"LABS.",sub:"Gallery border / magenta",border:C.ma},
            {mode:"CONTENT",font:F.b,w:400,sz:14,c:C.pw,bg:C.bk,sample:"Event photo here",sub:"Watermark only",opacity:0.5},
            {mode:"EDITORIAL",font:F.b,w:400,sz:14,c:C.pw,bg:C.bk,sample:"The Inside Story",sub:"DM Sans mixed case"},
            {mode:"QUOTE",font:F.e,w:400,sz:16,c:C.ow,bg:C.bk,sample:'"The room remembers."',sub:"DM Serif Italic on black",italic:true},
            {mode:"STATS",font:F.d,w:800,sz:28,c:C.tl,bg:C.bk,sample:"500+",sub:"Gradient numbers"},
            {mode:"METAPHOR",font:F.e,w:400,sz:16,c:C.ow,bg:C.bk,sample:"Impossible Angles",sub:"DM Serif Italic + POV",italic:true},
            {mode:"TESTIMONIAL",font:F.e,w:400,sz:14,c:C.ow,bg:C.fd,sample:'"Flawless execution."',sub:"Client quote / serif",italic:true},
            {mode:"EVENT DAY",font:F.b,w:700,sz:14,c:C.pw,bg:C.bk,sample:"LIVE NOW",sub:"DM Sans Bold / raw"},
          ].map(m => (
            <div key={m.mode} style={{borderRadius:10,overflow:"hidden",border:`1px solid ${m.border||C.dg}`}}>
              <div style={{height:90,background:m.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:12,borderBottom:m.border?`3px solid ${m.border}`:"none"}}>
                <div style={{fontFamily:m.font,fontWeight:m.w,fontSize:m.sz,color:m.c,fontStyle:m.italic?"italic":"normal",opacity:m.opacity||1,textAlign:"center",lineHeight:1.1}}>{m.sample}</div>
              </div>
              <div style={{padding:"8px 10px",background:C.fd}}>
                <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.1em",color:C.or,marginBottom:2}}>{m.mode}</div>
                <div style={{fontFamily:F.b,fontSize:10,color:C.gy}}>{m.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <Lb>4 CONTENT TIERS</Lb>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12,marginBottom:48}}>
          {[{n:"T1: Pure Brand",d:"Waveforms, taglines, abstract. 100% Miradore colours. 30%.",c:C.or},{n:"T2: Client Showcase",d:"Client colours + Miradore structural frame. Real photos preferred. 30%.",c:C.tl},{n:"T3: Division",d:"Division-specific palette. Labs=magenta. Weddings=gold. 25%.",c:C.ma},{n:"T4: Event Day",d:"Live, raw, documentary. Minimal branding overlay. 15%.",c:C.gy}].map(t => (
            <div key={t.n} style={{padding:20,background:C.fd,borderRadius:10,borderTop:`3px solid ${t.c}`}}>
              <div style={{fontFamily:F.d,fontWeight:800,fontSize:14,color:C.pw,marginBottom:8}}>{t.n}</div>
              <div style={{fontFamily:F.b,fontSize:13,color:C.lg,lineHeight:1.5}}>{t.d}</div>
            </div>
          ))}
        </div>

        <A id="applied"/>
        <Br line1="How it all" line2="COMES TOGETHER." img={IMG.s05Events}/>
        <div style={{width:"100vw",marginLeft:"calc(-50vw + 50%)",background:C.iv,padding:"80px clamp(24px,5vw,80px)"}}>
          <div style={{maxWidth:900,margin:"0 auto"}}>
            <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.2em",color:C.or,marginBottom:8}}>S13</div>
            <h2 style={{fontFamily:F.d,fontWeight:800,fontSize:"clamp(36px,5vw,56px)",lineHeight:0.95,margin:"0 0 8px",color:C.bk}}>Applied.</h2>
            <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:18,color:C.mg,marginBottom:48}}>The system in context.</div>

            <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.15em",color:C.or,marginBottom:16}}>DIGITAL</div>

            <div style={{fontFamily:F.b,fontSize:11,color:C.mg,marginBottom:8}}>Proposal Cover</div>
            <div style={{maxWidth:480,margin:"0 auto 40px"}}>
              <div style={{background:C.bk,borderRadius:12,padding:32,position:"relative",overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:GR}}/>
                <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.15em",color:C.tl,marginBottom:32}}>COMMERCIAL PROPOSAL</div>
                <div style={{fontFamily:F.d,fontWeight:800,fontSize:28,lineHeight:1,...GT,marginBottom:8}}>PROJECT<br/>AURORA.</div>
                <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:14,color:C.ow,marginBottom:24}}>A premium event experience.</div>
                <div style={{width:"100%",height:2,background:GR,marginBottom:16}}/>
                <div style={{fontFamily:F.m,fontSize:10,color:C.mg}}>MIRADORE PRODUCTIONS / MARCH 2026</div>
              </div>
            </div>

            <div style={{fontFamily:F.b,fontSize:11,color:C.mg,marginBottom:8}}>Social Media Post (1:1)</div>
            <div style={{maxWidth:340,margin:"0 auto 40px"}}>
              <div style={{aspectRatio:"1/1",background:C.bk,borderRadius:12,overflow:"hidden",position:"relative",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
                <img src={IMG.s05Hero} alt="" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0,opacity:0.5}}/>
                <div style={{position:"absolute",bottom:0,left:0,right:0,padding:20,background:"linear-gradient(0deg,rgba(12,12,12,0.8) 0%,transparent 100%)"}}>
                  <div style={{fontFamily:F.d,fontWeight:800,fontSize:22,color:C.pw,lineHeight:1.1,marginBottom:16}}>PRECISION IS<br/>INVISIBLE.</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                    <div style={{fontFamily:F.b,fontWeight:700,fontSize:10,letterSpacing:"0.14em",...GT}}>MIRADORE</div>
                    <div style={{fontFamily:F.m,fontSize:10,color:C.mg}}>DUBAI. ISLAMABAD. RIYADH.</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{fontFamily:F.b,fontSize:11,color:C.mg,marginBottom:8}}>Email Signature</div>
            <div style={{maxWidth:400,margin:"0 auto 40px",background:C.pw,borderRadius:8,padding:20,boxShadow:"0 4px 24px rgba(0,0,0,0.08)"}}>
              <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                <div style={{width:48,height:48,background:C.bk,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Emblem color={C.or} size={28}/></div>
                <div>
                  <div style={{fontFamily:F.b,fontSize:13,fontWeight:700,color:C.bk}}>Teepu Malik</div>
                  <div style={{fontFamily:F.b,fontSize:11,color:C.mg}}>CEO and Co-Founder</div>
                  <div style={{width:"100%",height:2,background:GR,margin:"8px 0",borderRadius:1}}/>
                  <div style={{fontFamily:F.b,fontSize:10,color:C.mg}}>teepu@miradore.ae</div>
                  <div style={{fontFamily:F.m,fontSize:10,color:C.gy,marginTop:4}}>DUBAI. ISLAMABAD. RIYADH.</div>
                </div>
              </div>
            </div>

            <div style={{fontFamily:F.b,fontSize:11,color:C.mg,marginBottom:8}}>Website (miradore.ae)</div>
            <div style={{maxWidth:560,margin:"0 auto 40px"}}>
              <div style={{background:"#1a1a1a",borderRadius:"12px 12px 0 0",padding:"8px 12px",display:"flex",gap:6,alignItems:"center"}}>
                <div style={{width:10,height:10,borderRadius:5,background:"#ff5f56"}}/><div style={{width:10,height:10,borderRadius:5,background:"#ffbd2e"}}/><div style={{width:10,height:10,borderRadius:5,background:"#27c93f"}}/>
                <div style={{flex:1,background:"#2a2a2a",borderRadius:4,padding:"3px 8px",marginLeft:8}}><div style={{fontFamily:F.m,fontSize:10,color:C.gy}}>miradore.ae</div></div>
              </div>
              <div style={{background:C.bk,borderRadius:"0 0 12px 12px",padding:0,minHeight:160,overflow:"hidden",position:"relative"}}>
                <img src={IMG.cover} alt="" style={{width:"100%",height:100,objectFit:"cover",display:"block",opacity:0.5}}/>
                <div style={{padding:"16px 24px 24px"}}>
                  <div style={{fontFamily:F.m,fontSize:10,color:C.tl,marginBottom:12}}>PREMIUM CREATIVE + EVENTS</div>
                  <div style={{fontFamily:F.d,fontWeight:800,fontSize:28,...GT,marginBottom:8}}>MIRADORE.</div>
                  <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:14,color:C.ow}}>Designed to be felt.</div>
                  <div style={{width:120,height:3,background:GR,marginTop:16,borderRadius:2}}/>
                </div>
              </div>
            </div>

            <div style={{fontFamily:F.b,fontSize:11,color:C.mg,marginBottom:8}}>Presentation Deck Cover</div>
            <div style={{maxWidth:560,margin:"0 auto 40px"}}>
              <div style={{aspectRatio:"16/9",background:C.bk,borderRadius:12,overflow:"hidden",position:"relative",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
                <img src={IMG.s05Events} alt="" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0,opacity:0.4}}/>
                <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:32,background:"linear-gradient(0deg,rgba(12,12,12,0.7) 0%,transparent 50%)"}}>
                  <div style={{fontFamily:F.m,fontSize:10,color:C.tl,marginBottom:8}}>JAZZ SALES CONFERENCE 2026</div>
                  <div style={{fontFamily:F.d,fontWeight:800,fontSize:32,...GT,lineHeight:0.95}}>GAME<br/>CHANGERS.</div>
                  <div style={{width:100,height:3,background:GR,marginTop:16,borderRadius:2}}/>
                </div>
              </div>
            </div>

            <div style={{fontFamily:F.b,fontSize:11,color:C.mg,marginBottom:8}}>LinkedIn Banner</div>
            <div style={{maxWidth:560,margin:"0 auto 40px"}}>
              <div style={{aspectRatio:"4/1",background:C.bk,borderRadius:8,overflow:"hidden",position:"relative"}}>
                <img src={IMG.cover} alt="" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0,opacity:0.4}}/>
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 32px"}}>
                  <div><div style={{fontFamily:F.d,fontWeight:800,fontSize:18,...GT}}>MIRADORE</div><div style={{fontFamily:F.e,fontStyle:"italic",fontSize:10,color:C.ow}}>Designed to be felt.</div></div>
                  <div style={{fontFamily:F.m,fontSize:10,color:C.gy}}>DUBAI. ISLAMABAD. RIYADH.</div>
                </div>
              </div>
            </div>

            <div style={{fontFamily:F.b,fontSize:11,color:C.mg,marginBottom:8}}>Instagram Grid (9-post)</div>
            <div style={{maxWidth:320,margin:"0 auto 40px"}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2}}>
                {[{type:"img",src:IMG.s05Hero},{type:"text",t:"FELT."},{type:"img",src:IMG.s05Events},{type:"text",t:"500+"},{type:"img",src:IMG.s06Holographic},{type:"text",t:"CRAFT."},{type:"img",src:IMG.s05Weddings},{type:"text",t:"19 YRS"},{type:"img",src:IMG.s05Heartbeat}].map((cell,i) => (
                  <div key={i} style={{aspectRatio:"1/1",overflow:"hidden",borderRadius:i===0?"6px 0 0 0":i===2?"0 6px 0 0":i===6?"0 0 0 6px":i===8?"0 0 6px 0":"0"}}>
                    {cell.type==="img" ? <img src={cell.src} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/> : <div style={{width:"100%",height:"100%",background:C.bk,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{fontFamily:F.d,fontWeight:800,fontSize:14,...GT}}>{cell.t}</div></div>}
                  </div>
                ))}
              </div>
            </div>

            <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.15em",color:C.or,marginBottom:16,marginTop:48}}>PRINT</div>

            <div style={{fontFamily:F.b,fontSize:11,color:C.mg,marginBottom:8}}>Business Card (Front + Back)</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,maxWidth:560,margin:"0 auto 40px"}}>
              <div style={{aspectRatio:"1.75/1",background:C.bk,borderRadius:8,padding:20,display:"flex",flexDirection:"column",justifyContent:"space-between",boxShadow:"0 8px 32px rgba(0,0,0,0.2)"}}>
                <Emblem color={C.or} size={24}/>
                <div>
                  <div style={{fontFamily:F.b,fontSize:12,fontWeight:700,color:C.pw}}>Teepu Malik</div>
                  <div style={{fontFamily:F.b,fontSize:10,color:C.gy}}>CEO and Co-Founder</div>
                  <div style={{width:40,height:2,background:GR,margin:"6px 0",borderRadius:1}}/>
                  <div style={{fontFamily:F.m,fontSize:10,color:C.mg}}>teepu@miradore.ae</div>
                </div>
              </div>
              <div style={{aspectRatio:"1.75/1",background:C.bk,borderRadius:8,overflow:"hidden",position:"relative",boxShadow:"0 8px 32px rgba(0,0,0,0.2)"}}>
                <img src={IMG.s05Hero} alt="" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0,opacity:0.5}}/>
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}><Emblem color={C.pw} size={36}/></div>
              </div>
            </div>

            <div style={{fontFamily:F.b,fontSize:11,color:C.mg,marginBottom:8}}>Letterhead A4</div>
            <div style={{maxWidth:360,margin:"0 auto 40px"}}>
              <div style={{aspectRatio:"1/1.414",background:C.pw,borderRadius:8,padding:24,position:"relative",boxShadow:"0 8px 32px rgba(0,0,0,0.1)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:40}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}><Emblem color={C.or} size={18}/><div style={{fontFamily:F.b,fontWeight:700,fontSize:10,letterSpacing:"0.14em",color:C.or}}>MIRADORE</div></div>
                  <div style={{fontFamily:F.m,fontSize:10,color:C.gy,textAlign:"right"}}>Dubai. Islamabad. Riyadh.</div>
                </div>
                {[...Array(8)].map((_,i) => <div key={i} style={{height:5,background:`${C.bk}08`,borderRadius:3,marginBottom:8,width:`${85-i*5}%`}}/>)}
                <div style={{position:"absolute",bottom:0,left:0,right:0,height:4,background:GR}}/>
              </div>
            </div>

            <div style={{fontFamily:F.b,fontSize:11,color:C.mg,marginBottom:8}}>Envelope</div>
            <div style={{maxWidth:440,margin:"0 auto 40px"}}>
              <div style={{aspectRatio:"2.4/1",background:C.pw,borderRadius:8,padding:20,position:"relative",boxShadow:"0 8px 32px rgba(0,0,0,0.1)"}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}><Emblem color={C.or} size={14}/><div style={{fontFamily:F.b,fontWeight:700,fontSize:10,letterSpacing:"0.14em",color:C.or}}>MIRADORE</div></div>
                <div style={{position:"absolute",bottom:0,left:0,right:0,height:3,background:GR}}/>
              </div>
            </div>

            <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.15em",color:C.or,marginBottom:16,marginTop:48}}>ENVIRONMENTAL</div>

            <div style={{fontFamily:F.b,fontSize:11,color:C.mg,marginBottom:8}}>Event Backdrop (16:9 stage)</div>
            <div style={{maxWidth:560,margin:"0 auto 40px"}}>
              <div style={{aspectRatio:"16/9",background:C.bk,borderRadius:12,overflow:"hidden",position:"relative",boxShadow:"0 20px 60px rgba(0,0,0,0.4)"}}>
                <img src={IMG.s05Hero} alt="" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0,opacity:0.6}}/>
                <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"radial-gradient(ellipse at center,rgba(12,12,12,0.5) 0%,rgba(12,12,12,0.2) 100%)"}}>
                  <Emblem color={C.pw} size={56}/>
                  <div style={{fontFamily:F.d,fontWeight:800,fontSize:28,...GT,marginTop:12}}>MIRADORE</div>
                  <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:13,color:C.ow,marginTop:6}}>Designed to be felt.</div>
                </div>
                <div style={{position:"absolute",bottom:6,right:10,fontFamily:F.m,fontSize:10,color:`${C.gy}66`}}>12m x 6.75m / 40ft x 22ft</div>
              </div>
            </div>

            <div style={{fontFamily:F.b,fontSize:11,color:C.mg,marginBottom:8}}>Delegate Badge</div>
            <div style={{maxWidth:240,margin:"0 auto 40px"}}>
              <div style={{background:C.bk,borderRadius:12,padding:"24px 20px",textAlign:"center",boxShadow:"0 8px 32px rgba(0,0,0,0.3)"}}>
                <Emblem color={C.or} size={24}/>
                <div style={{fontFamily:F.m,fontSize:10,letterSpacing:"0.2em",color:C.tl,marginTop:10,marginBottom:10}}>48TH OIC COUNCIL</div>
                <div style={{fontFamily:F.d,fontWeight:800,fontSize:16,...GT}}>DELEGATE</div>
                <div style={{width:40,height:2,background:GR,margin:"8px auto"}}/>
                <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:11,color:C.ow}}>Islamabad, Pakistan</div>
                <div style={{fontFamily:F.m,fontSize:10,color:C.mg,marginTop:8}}>PRODUCED BY MIRADORE</div>
              </div>
            </div>

            <div style={{fontFamily:F.b,fontSize:11,color:C.mg,marginBottom:8}}>Venue Wayfinding</div>
            <div style={{maxWidth:260,margin:"0 auto 40px"}}>
              <div style={{background:C.bk,borderRadius:12,padding:20,textAlign:"center",boxShadow:"0 8px 32px rgba(0,0,0,0.3)"}}>
                <div style={{fontFamily:F.d,fontWeight:800,fontSize:28,...GT}}>→</div>
                <div style={{fontFamily:F.d,fontWeight:800,fontSize:14,color:C.pw,marginTop:4}}>MAIN HALL</div>
                <div style={{fontFamily:F.b,fontSize:10,color:C.gy,marginTop:2}}>Plenary Session</div>
                <div style={{width:"100%",height:2,background:GR,margin:"12px 0 8px",borderRadius:1}}/>
                <div style={{fontFamily:F.m,fontSize:10,color:C.mg}}>MIRADORE PRODUCTIONS</div>
              </div>
            </div>

            <div style={{fontFamily:F.b,fontSize:11,color:C.mg,marginBottom:8}}>Compliment Slip</div>
            <div style={{maxWidth:400,margin:"0 auto 40px"}}>
              <div style={{aspectRatio:"3/1",background:C.pw,borderRadius:6,padding:16,position:"relative",boxShadow:"0 4px 16px rgba(0,0,0,0.08)"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}><Emblem color={C.or} size={12}/><div style={{fontFamily:F.b,fontWeight:700,fontSize:10,letterSpacing:"0.14em",color:C.or}}>MIRADORE</div></div>
                <div style={{fontFamily:F.e,fontStyle:"italic",fontSize:11,color:C.mg}}>With compliments</div>
                <div style={{position:"absolute",bottom:0,left:0,right:0,height:2,background:GR}}/>
              </div>
            </div>
          </div>
        </div>

        <A id="end"/>
        <Rl my={80}/>
        <Br line1="Designed to be felt." line2="" img={IMG.s06Lighttrails}/>
        <div style={{paddingBottom:120}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:32}}><Emblem color={C.or} size={48}/></div>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:24}}>
            <div>
              <div style={{fontFamily:F.b,fontWeight:700,fontSize:12,letterSpacing:"0.14em",...GT}}>MIRADORE</div>
              <div style={{fontFamily:F.m,fontSize:10,color:C.mg,marginTop:4}}>Premium Creative + Events Agency</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:F.m,fontSize:10,color:C.mg}}>v4.7 / March 2026</div>
              <div style={{fontFamily:F.m,fontSize:10,color:C.mg,marginTop:2}}>Pentagram Benchmark Rebuild</div>
            </div>
          </div>
          <div style={{width:"100%",height:1,background:C.dg,marginBottom:16}}/>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
            <div style={{fontFamily:F.m,fontSize:10,color:C.mg}}>Locked: S01, S02, S03, S04, S05, S06, S07, S10, S13, S15</div>
            <div style={{fontFamily:F.m,fontSize:10,color:C.mg}}>Dubai. Islamabad. Riyadh.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
