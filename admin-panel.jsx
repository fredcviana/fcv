import { useState, useEffect } from "react";

const SK = "fcv-v1";
const PK = "fcv-photo-v1";

const PT = { livro:"Livro", capitulo:"Capítulo", artigo:"Artigo", apresentacao:"Conferência", relatorio:"Relatório" };
const PC = { livro:"#2a5f8a", capitulo:"#2a5f8a", artigo:"#3b6e50", apresentacao:"#7a3a8a", relatorio:"#b8762a" };
const PB = { livro:"#e8f0f8", capitulo:"#e8f0f8", artigo:"#e3ede6", apresentacao:"#f3e8f5", relatorio:"#fdf3e3" };

const DEF = {
  hero: {
    eyebrow: "Gerente de Sustentabilidade · HIDROBR · PhD em Resiliência",
    tagline: "Investigo como sistemas críticos respondem a choques climáticos e pressões institucionais. Na HIDROBR, esse trabalho vira prática: projetos, políticas e decisões com base científica."
  },
  about: {
    paragraphs: [
      "Sou Engenheiro Ambiental pela FUMEC, com mestrado em Estratégia Empresarial e doutor em Sustentabilidade pela Fundação Getulio Vargas (FGV). Realizei estágio doutoral na Pontificia Universidad Católica de Valparaíso (PUCV), no Chile, onde aprofundei o uso de inteligência artificial aplicada a engenharia.",
      "Na HIDROBR, lidero a área de Sustentabilidade. Tenho trabalhos publicados sobre resiliência energética, gestão de desastres e mercados de carbono.",
      "Minha pesquisa parte da teoria da panarquia e dos Sistemas Socioecológicos (SES) para entender como sistemas críticos, especialmente o setor elétrico brasileiro, respondem a choques climáticos e falhas de governança. A distância entre ciência e decisão ainda é grande demais."
    ],
    tags: ["Resiliência de Infraestrutura","Sistemas Socioecológicos","Adaptação Climática","Teoria da Panarquia","Governança","Mercados de Carbono"]
  },
  publications: {
    books: [
      { year:"2024", type:"livro", title:"IUCN Rio Doce Panel: Stories of Influence in Dam Disaster Recovery", authors:"Viana, F. C.", venue:"IUCN — International Union for Conservation of Nature, Gland, Suíça", link:"https://portals.iucn.org/library/sites/library/files/documents/2024-003-En.pdf", isNew:false },
      { year:"2021", type:"livro", title:"Transformando Empresas em Negócios Sustentáveis", authors:"Viana, F. C.", venue:"Publicação autoral", link:"https://www.researchgate.net/publication/353841764_Transformando_Empresas_em_Negocios_Sustentaveis_A_experiencia_da_Refugio_em_gestao_ambiental_industrial", isNew:false },
      { year:"2021", type:"capitulo", title:"Um Estudo de Caso dos Princípios da Economia Circular e da Sustentabilidade em Uma MPE do Estado de Minas Gerais", authors:"Viana, F. C.", venue:"Capítulo de livro, 2021", link:"https://www.researchgate.net/publication/348954916_Um_Estudo_de_Caso_dos_Principios_da_Economia_Circular_e_da_Sustentabilidade_em_Uma_MPE_do_Estado_de_Minas_Gerais", isNew:false }
    ],
    articles: [
      { year:"2024", type:"apresentacao", title:"E se o Mercado de Carbono Fosse Acessível para Todo Mundo? Relato de um Experimento", authors:"Viana, F. C., Queiroz, V. C.", venue:"IAIA24 — International Association for Impact Assessment, Dublin, Irlanda", link:"https://www.hidrobr.com/artigo/e-se-o-mercado-de-carbono-fosse-acessivel-para-todo-mundo-relato-de-um-experimento/", isNew:false },
      { year:"2023", type:"apresentacao", title:"E se o Mercado de Carbono Fosse Acessível para Todo Mundo? Relato de um Experimento", authors:"Viana, F. C., Queiroz, V. C.", venue:"CONTECC — Congresso Técnico Científico da Engenharia e da Agronomia, 2023", link:"https://www.researchgate.net/publication/377106853_E_SE_O_MERCADO_DE_CARBONO_FOSSE_ACESSIVEL_PARA_TODO_MUNDO_RELATO_DE_UM_EXPERIMENTO", isNew:false },
      { year:"2022", type:"apresentacao", title:"The Search for Specifics in Ex-Post Impact Assessments", authors:"Viana, F. C.", venue:"IAIA22 — International Association for Impact Assessment, Vancouver, Canadá", link:"#", isNew:false },
      { year:"2021", type:"apresentacao", title:"The Use of Axioms for Disasters Impact Assessment: a Lesson Learned from Fundão Dam", authors:"Viana, F. C., Cavalcante, A. S.", venue:"IAIA21 — International Association for Impact Assessment", link:"https://doi.org/10.13140/RG.2.2.30484.01925", isNew:false },
      { year:"2021", type:"artigo", title:"A Importância da Governança em Momentos de Crise: um Teste do G do ESG na Vida Real", authors:"Viana, F. C., Bernardo Junior, C.", venue:"SEMEAD — Seminários em Administração, USP, 2021", link:"https://doi.org/10.13140/RG.2.2.35951.36004", isNew:false },
      { year:"2021", type:"artigo", title:"A Sustentabilidade na Indústria da Moda e o Ressurgimento dos Corantes Naturais: desafios e possibilidades no século XXI", authors:"Souza, T., Ribeiro, R., Ayres, E., Viana, F. C.", venue:"Dobras — Revista da Associação Brasileira de Estudos de Pesquisas em Moda, 2021", link:"https://doi.org/10.26563/dobras.i32.1367", isNew:false },
      { year:"2021", type:"apresentacao", title:"Os Axiomas da Avaliação de Impacto de Desastres", authors:"Viana, F. C., Cavalcante, A. S.", venue:"CBAI — Congresso Brasileiro de Avaliação de Impactos, 2021", link:"https://www.researchgate.net/publication/355446212_OS_AXIOMAS_DA_AVALIACAO_DE_IMPACTO_DE_DESASTRES_-_CBAI_2021", isNew:false }
    ]
  },
  projects: [
    { icon:"⚡", title:"Resiliência no Setor Elétrico Brasileiro", desc:"Pesquisa de doutorado concluída pela FGV sobre como o setor elétrico brasileiro responde a choques climáticos e falhas de governança. Metodologia baseada em SES e teoria da panarquia, com análise institucional histórica e entrevistas.", links:[{label:"ResearchGate →",url:"https://www.researchgate.net/profile/Frederico-Viana"}] },
    { icon:"🌊", title:"Painel Rio Doce (IUCN)", desc:"Trabalho sobre o Painel Científico do Rio Doce (IUCN), com análise do rompimento da barragem de Fundão em 2015. Publicado em 2024 pela IUCN.", links:[{label:"IUCN →",url:"https://iucn.org/resources/grey-literature/iucn-rio-doce-panel"},{label:"PDF →",url:"https://portals.iucn.org/library/sites/library/files/documents/2024-003-En.pdf"}] },
    { icon:"♻️", title:"Feira do Carbono", desc:"Modelo de compensação de carbono conectado a cooperativas, desenvolvido na HIDROBR. Apresentado no IAIA24 em Dublin e no CONTECC 2023.", links:[{label:"Artigo HIDROBR →",url:"https://www.hidrobr.com/artigo/e-se-o-mercado-de-carbono-fosse-acessivel-para-todo-mundo-relato-de-um-experimento/"}] },
    { icon:"🤖", title:"IA & Bibliometria em Resiliência Energética", desc:"Estudo bibliométrico com machine learning sobre a evolução da pesquisa em resiliência energética. Desenvolvido durante estágio doutoral na PUCV.", links:[] }
  ],
  blog: [
    { tag:"Análise", title:"Falhas Recorrentes em Sistemas Elétricos", date:"2025", link:"https://www.hidrobr.com/artigo/falhas-recorrentes-em-sistemas-eletricos/" },
    { tag:"Análise Climática", title:"Super El Niño 2026", date:"2025", link:"https://www.hidrobr.com/artigo/super-el-nino-2026/" },
    { tag:"Evento", title:"Notas do Evento: Resiliência nas Operações de Mineração", date:"2024", link:"https://www.hidrobr.com/artigo/notas-do-evento-resiliencia-nas-operacoes-de-mineracao/" },
    { tag:"Workshop", title:"III Workshop HIDROBR — Pilhas na Mineração: do Projeto à Operação", date:"2024", link:"https://www.hidrobr.com/artigo/iii-workshop-hidrobr-pilhas-na-mineracao-do-projeto-a-operacao/" },
    { tag:"Estudo de Caso", title:"E se o Mercado de Carbono Fosse Acessível para Todo Mundo?", date:"2023", link:"https://www.hidrobr.com/artigo/e-se-o-mercado-de-carbono-fosse-acessivel-para-todo-mundo-relato-de-um-experimento/" }
  ],
  contact: {
    text1:"Atuo como Gerente de Sustentabilidade na HIDROBR. Para projetos de consultoria, o contato é pelo site da empresa.",
    text2:"Para colaborações de pesquisa, palestras ou revisão de artigos, fale diretamente comigo.",
    email:"fredcviana@gmail.com",
    location:"Belo Horizonte, Minas Gerais",
    institutionUrl:"https://hidrobr.com",
    degree:"PhD em Resiliência · FGV",
    links:[
      {icon:"🎓",label:"ResearchGate",url:"https://www.researchgate.net/profile/Frederico-Viana"},
      {icon:"💼",label:"LinkedIn",url:"https://www.linkedin.com/in/frederico-campos-viana-65686014"},
      {icon:"🌐",label:"hidrobr.com",url:"https://hidrobr.com"}
    ]
  }
};

// ── Styles ──────────────────────────────────────────────────────
const s = {
  input: { width:"100%", padding:"8px 10px", border:"1px solid #ddd8cd", borderRadius:6, fontSize:13, fontFamily:"inherit", background:"#fafaf8", outline:"none", boxSizing:"border-box" },
  label: { display:"block", fontSize:12, fontWeight:600, color:"#7a7060", marginBottom:4, letterSpacing:"0.05em", textTransform:"uppercase" },
  card: { background:"white", border:"1px solid #e5e5e3", borderRadius:8, padding:16, marginBottom:10 },
  row: { display:"flex", gap:8, alignItems:"flex-start" },
  btn: (bg,color="#fff") => ({ background:bg, color, border:"none", borderRadius:6, padding:"7px 14px", cursor:"pointer", fontSize:12, fontWeight:600, whiteSpace:"nowrap" }),
  h2: { fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:18, color:"#3b6e50", marginBottom:16, fontWeight:400 },
  h3: { fontSize:13, fontWeight:700, color:"#1c1913", margin:"20px 0 10px", textTransform:"uppercase", letterSpacing:"0.06em" }
};

function Field({ label, value, onChange, multi, rows=3, placeholder="" }) {
  return (
    <div style={{marginBottom:12}}>
      <label style={s.label}>{label}</label>
      {multi
        ? <textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows} placeholder={placeholder} style={{...s.input,resize:"vertical"}} />
        : <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={s.input} />
      }
    </div>
  );
}

// ── Section Editors ─────────────────────────────────────────────

function HeroEditor({ data, onChange }) {
  return (
    <div>
      <h2 style={s.h2}>Hero</h2>
      <Field label="Linha de identificação (eyebrow)" value={data.eyebrow} onChange={v=>onChange({...data,eyebrow:v})} />
      <Field label="Tagline" value={data.tagline} onChange={v=>onChange({...data,tagline:v})} multi rows={4} />
    </div>
  );
}

function AboutEditor({ data, onChange }) {
  const upd = (i,v) => { const p=[...data.paragraphs]; p[i]=v; onChange({...data,paragraphs:p}); };
  const addP = () => onChange({...data,paragraphs:[...data.paragraphs,""]});
  const delP = i => { const p=data.paragraphs.filter((_,j)=>j!==i); onChange({...data,paragraphs:p}); };
  const updTag = (i,v) => { const t=[...data.tags]; t[i]=v; onChange({...data,tags:t}); };
  const addTag = () => onChange({...data,tags:[...data.tags,""]});
  const delTag = i => onChange({...data,tags:data.tags.filter((_,j)=>j!==i)});
  return (
    <div>
      <h2 style={s.h2}>Sobre</h2>
      <h3 style={s.h3}>Parágrafos da bio</h3>
      {data.paragraphs.map((p,i)=>(
        <div key={i} style={{...s.card,paddingBottom:10}}>
          <div style={{...s.row,justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:12,color:"#7a7060",fontWeight:600}}>Parágrafo {i+1}</span>
            <button onClick={()=>delP(i)} style={s.btn("#fee2e2","#991b1b")}>✕ Remover</button>
          </div>
          <textarea value={p} onChange={e=>upd(i,e.target.value)} rows={4} style={{...s.input,resize:"vertical"}} />
        </div>
      ))}
      <button onClick={addP} style={s.btn("#3b6e50")}>+ Adicionar parágrafo</button>

      <h3 style={s.h3}>Tags de pesquisa</h3>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:10}}>
        {data.tags.map((t,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:4,background:"#e3ede6",borderRadius:100,padding:"4px 10px"}}>
            <input value={t} onChange={e=>updTag(i,e.target.value)} style={{border:"none",background:"transparent",fontSize:13,color:"#3b6e50",width:Math.max(60,t.length*8),outline:"none"}} />
            <button onClick={()=>delTag(i)} style={{border:"none",background:"none",cursor:"pointer",color:"#3b6e50",fontSize:14,lineHeight:1,padding:0}}>×</button>
          </div>
        ))}
        <button onClick={addTag} style={{...s.btn("#f0f0ee","#3b6e50"),border:"1px dashed #3b6e50"}}>+ Tag</button>
      </div>
    </div>
  );
}

function PubItem({ pub, onChange, onDelete }) {
  const u = (k,v) => onChange({...pub,[k]:v});
  return (
    <div style={s.card}>
      <div style={{...s.row,justifyContent:"space-between",marginBottom:10}}>
        <div style={{...s.row,gap:6,flex:1}}>
          <select value={pub.type} onChange={e=>u("type",e.target.value)} style={{...s.input,width:130}}>
            {Object.entries(PT).map(([k,v])=><option key={k} value={k}>{v}</option>)}
          </select>
          <input value={pub.year} onChange={e=>u("year",e.target.value)} style={{...s.input,width:70}} placeholder="Ano" />
          <label style={{display:"flex",alignItems:"center",gap:4,fontSize:12,color:"#b8762a",cursor:"pointer"}}>
            <input type="checkbox" checked={pub.isNew||false} onChange={e=>u("isNew",e.target.checked)} />
            Novo
          </label>
        </div>
        <button onClick={onDelete} style={s.btn("#fee2e2","#991b1b")}>✕</button>
      </div>
      <Field label="Título" value={pub.title} onChange={v=>u("title",v)} />
      <Field label="Autores" value={pub.authors} onChange={v=>u("authors",v)} />
      <Field label="Venue / Periódico" value={pub.venue} onChange={v=>u("venue",v)} />
      <Field label="Link (URL ou DOI)" value={pub.link} onChange={v=>u("link",v)} placeholder="https://" />
    </div>
  );
}

function PublicationsEditor({ data, onChange }) {
  const newPub = () => ({year:new Date().getFullYear().toString(),type:"artigo",title:"",authors:"",venue:"",link:"",isNew:true});
  const updBook = (i,v) => { const b=[...data.books]; b[i]=v; onChange({...data,books:b}); };
  const delBook = i => onChange({...data,books:data.books.filter((_,j)=>j!==i)});
  const updArt = (i,v) => { const a=[...data.articles]; a[i]=v; onChange({...data,articles:a}); };
  const delArt = i => onChange({...data,articles:data.articles.filter((_,j)=>j!==i)});
  return (
    <div>
      <h2 style={s.h2}>Publicações</h2>
      <h3 style={s.h3}>Livros & Capítulos</h3>
      {data.books.map((p,i)=><PubItem key={i} pub={p} onChange={v=>updBook(i,v)} onDelete={()=>delBook(i)} />)}
      <button onClick={()=>onChange({...data,books:[...data.books,{...newPub(),type:"livro"}]})} style={s.btn("#3b6e50")}>+ Adicionar livro / capítulo</button>

      <h3 style={s.h3}>Artigos & Conferências</h3>
      {data.articles.map((p,i)=><PubItem key={i} pub={p} onChange={v=>updArt(i,v)} onDelete={()=>delArt(i)} />)}
      <button onClick={()=>onChange({...data,articles:[...data.articles,newPub()]})} style={s.btn("#3b6e50")}>+ Adicionar artigo / conferência</button>
    </div>
  );
}

function ProjectsEditor({ data, onChange }) {
  const newProj = () => ({icon:"🔬",title:"",desc:"",links:[]});
  const upd = (i,v) => { const d=[...data]; d[i]=v; onChange(d); };
  const del = i => onChange(data.filter((_,j)=>j!==i));
  const addLink = i => { const d=[...data]; d[i]={...d[i],links:[...d[i].links,{label:"",url:""}]}; onChange(d); };
  const updLink = (i,j,k,v) => { const d=[...data]; const l=[...d[i].links]; l[j]={...l[j],[k]:v}; d[i]={...d[i],links:l}; onChange(d); };
  const delLink = (i,j) => { const d=[...data]; d[i]={...d[i],links:d[i].links.filter((_,k)=>k!==j)}; onChange(d); };
  return (
    <div>
      <h2 style={s.h2}>Projetos</h2>
      {data.map((p,i)=>(
        <div key={i} style={s.card}>
          <div style={{...s.row,justifyContent:"space-between",marginBottom:10}}>
            <span style={{fontSize:12,fontWeight:700,color:"#1c1913"}}>{p.title||`Projeto ${i+1}`}</span>
            <button onClick={()=>del(i)} style={s.btn("#fee2e2","#991b1b")}>✕</button>
          </div>
          <div style={s.row}>
            <div style={{width:70}}>
              <Field label="Ícone" value={p.icon} onChange={v=>upd(i,{...p,icon:v})} />
            </div>
            <div style={{flex:1}}>
              <Field label="Título" value={p.title} onChange={v=>upd(i,{...p,title:v})} />
            </div>
          </div>
          <Field label="Descrição" value={p.desc} onChange={v=>upd(i,{...p,desc:v})} multi rows={3} />
          <label style={s.label}>Links</label>
          {p.links.map((l,j)=>(
            <div key={j} style={{...s.row,marginBottom:6}}>
              <input value={l.label} onChange={e=>updLink(i,j,"label",e.target.value)} placeholder="Texto do link" style={{...s.input,flex:1}} />
              <input value={l.url} onChange={e=>updLink(i,j,"url",e.target.value)} placeholder="https://" style={{...s.input,flex:2}} />
              <button onClick={()=>delLink(i,j)} style={s.btn("#fee2e2","#991b1b")}>✕</button>
            </div>
          ))}
          <button onClick={()=>addLink(i)} style={{...s.btn("#f0f0ee","#3b6e50"),border:"1px dashed #3b6e50",marginTop:4}}>+ Link</button>
        </div>
      ))}
      <button onClick={()=>onChange([...data,newProj()])} style={s.btn("#3b6e50")}>+ Adicionar projeto</button>
    </div>
  );
}

function BlogEditor({ data, onChange }) {
  const newPost = () => ({tag:"",title:"",date:new Date().getFullYear().toString(),link:""});
  const upd = (i,v) => { const d=[...data]; d[i]=v; onChange(d); };
  const del = i => onChange(data.filter((_,j)=>j!==i));
  return (
    <div>
      <h2 style={s.h2}>Blog</h2>
      {data.map((p,i)=>(
        <div key={i} style={s.card}>
          <div style={{...s.row,justifyContent:"space-between",marginBottom:10}}>
            <span style={{fontSize:12,fontWeight:700,color:"#1c1913"}}>{p.title||`Post ${i+1}`}</span>
            <button onClick={()=>del(i)} style={s.btn("#fee2e2","#991b1b")}>✕</button>
          </div>
          <div style={s.row}>
            <div style={{flex:1}}><Field label="Categoria" value={p.tag} onChange={v=>upd(i,{...p,tag:v})} placeholder="Análise, Evento…" /></div>
            <div style={{width:80}}><Field label="Data" value={p.date} onChange={v=>upd(i,{...p,date:v})} placeholder="2025" /></div>
          </div>
          <Field label="Título" value={p.title} onChange={v=>upd(i,{...p,title:v})} />
          <Field label="Link" value={p.link} onChange={v=>upd(i,{...p,link:v})} placeholder="https://" />
        </div>
      ))}
      <button onClick={()=>onChange([...data,newPost()])} style={s.btn("#3b6e50")}>+ Adicionar post</button>
    </div>
  );
}

function ContactEditor({ data, onChange }) {
  const u = (k,v) => onChange({...data,[k]:v});
  const updLink = (i,k,v) => { const l=[...data.links]; l[i]={...l[i],[k]:v}; onChange({...data,links:l}); };
  const addLink = () => onChange({...data,links:[...data.links,{icon:"🔗",label:"",url:""}]});
  const delLink = i => onChange({...data,links:data.links.filter((_,j)=>j!==i)});
  return (
    <div>
      <h2 style={s.h2}>Contato</h2>
      <Field label="Texto 1" value={data.text1} onChange={v=>u("text1",v)} multi rows={3} />
      <Field label="Texto 2" value={data.text2} onChange={v=>u("text2",v)} multi rows={2} />
      <div style={s.row}>
        <div style={{flex:1}}><Field label="Email" value={data.email} onChange={v=>u("email",v)} placeholder="voce@email.com" /></div>
        <div style={{flex:1}}><Field label="Localização" value={data.location} onChange={v=>u("location",v)} /></div>
      </div>
      <div style={s.row}>
        <div style={{flex:1}}><Field label="URL Instituição" value={data.institutionUrl} onChange={v=>u("institutionUrl",v)} /></div>
        <div style={{flex:1}}><Field label="Formação" value={data.degree} onChange={v=>u("degree",v)} /></div>
      </div>
      <h3 style={s.h3}>Links de contato</h3>
      {data.links.map((l,i)=>(
        <div key={i} style={{...s.row,marginBottom:8}}>
          <input value={l.icon} onChange={e=>updLink(i,"icon",e.target.value)} style={{...s.input,width:48}} />
          <input value={l.label} onChange={e=>updLink(i,"label",e.target.value)} placeholder="Rótulo" style={{...s.input,flex:1}} />
          <input value={l.url} onChange={e=>updLink(i,"url",e.target.value)} placeholder="https://" style={{...s.input,flex:2}} />
          <button onClick={()=>delLink(i)} style={s.btn("#fee2e2","#991b1b")}>✕</button>
        </div>
      ))}
      <button onClick={addLink} style={{...s.btn("#f0f0ee","#3b6e50"),border:"1px dashed #3b6e50"}}>+ Link</button>
    </div>
  );
}

// ── HTML Generator ──────────────────────────────────────────────

function genHTML(d, photo) {
  const pubRow = (p) => `
    <div class="pub-item">
      <span class="pub-year">${p.year}</span>
      <div>
        <div class="pub-title">
          <span class="pub-type pub-type-${p.type}">${PT[p.type]||p.type}</span>
          <a href="${p.link||'#'}" target="_blank">${p.title}</a>
          ${p.isNew?'<span class="pub-badge">Novo</span>':''}
        </div>
        <div class="pub-meta">${p.authors}<br><span class="pub-venue">${p.venue}</span></div>
      </div>
    </div>`;

  const projCard = (p) => `
    <div class="project-card">
      <div class="project-icon">${p.icon}</div>
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.desc}</div>
      ${p.links.length ? `<div class="project-links">${p.links.map(l=>`<a href="${l.url}" target="_blank" class="project-link">${l.label}</a>`).join('')}</div>` : ''}
    </div>`;

  const photoSrc = photo || '';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Frederico Viana · Sustentabilidade & Resiliência</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#F7F4EF;--text:#1C1913;--accent:#3B6E50;--accent-amber:#B8762A;--accent-light:#E3EDE6;--muted:#7A7060;--border:#DDD8CD;--card-bg:#EDEBE4;--font-display:'Cormorant Garamond',Georgia,serif;--font-body:'Inter',system-ui,sans-serif}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 2.5rem;height:58px;display:flex;align-items:center;justify-content:space-between;background:rgba(247,244,239,0.9);backdrop-filter:blur(14px);border-bottom:1px solid transparent;transition:border-color .3s}
nav.scrolled{border-bottom-color:var(--border)}
.nav-logo{font-family:var(--font-display);font-size:1.25rem;font-weight:500;text-decoration:none;color:var(--text)}
.nav-links{display:flex;gap:2rem;list-style:none}
.nav-links a{font-size:.8rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;color:var(--muted);transition:color .2s}
.nav-links a:hover{color:var(--text)}
.container{max-width:880px;margin:0 auto;padding:0 2rem}
#hero{padding:148px 0 88px;background:radial-gradient(ellipse at 10% 90%,rgba(59,110,80,.09) 0%,transparent 55%),radial-gradient(ellipse at 85% 15%,rgba(184,118,42,.07) 0%,transparent 50%)}
.hero-rule{width:48px;height:2px;background:var(--accent);margin-bottom:1.5rem;border-radius:2px}
.hero-eyebrow{font-size:.75rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:1.5rem}
.hero-name{font-family:var(--font-display);font-size:clamp(3.2rem,8vw,5.8rem);font-weight:300;line-height:1.02;letter-spacing:-.01em;margin-bottom:1.75rem}
.hero-name em{font-style:italic;font-weight:400}
.hero-tagline{font-size:1.05rem;color:var(--muted);max-width:520px;line-height:1.78;margin-bottom:2.5rem}
.hero-actions{display:flex;gap:.75rem;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:.4rem;padding:.62rem 1.25rem;border-radius:6px;font-size:.85rem;font-weight:500;text-decoration:none;transition:all .18s;border:1.5px solid transparent;cursor:pointer}
.btn-primary{background:var(--accent);color:white}.btn-primary:hover{opacity:.86}
.btn-ghost{border-color:var(--border);color:var(--text);background:transparent}.btn-ghost:hover{border-color:#aaa}
section{padding:80px 0;border-bottom:1px solid var(--border)}
section:last-child{border-bottom:none}
.section-label{font-family:var(--font-display);font-style:italic;font-size:1rem;color:var(--accent);margin-bottom:.4rem;display:block}
.section-title{font-family:var(--font-display);font-size:clamp(1.9rem,4.5vw,3rem);font-weight:400;line-height:1.08;margin-bottom:2.75rem}
.about-grid{display:grid;grid-template-columns:200px 1fr;gap:3rem;align-items:start}
.about-photo{width:100%;aspect-ratio:3/4;background:var(--card-bg);border-radius:6px;border:1px solid var(--border);overflow:hidden}
.about-photo img{width:100%;height:100%;object-fit:cover;object-position:center 10%;display:block}
.about-text p{margin-bottom:1rem;color:#333;line-height:1.8;font-size:.97rem}
.interests{margin-top:1.75rem}
.interests-label{font-size:.72rem;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--muted);margin-bottom:.75rem}
.tags{display:flex;flex-wrap:wrap;gap:.45rem}
.tag{padding:.3rem .85rem;background:var(--accent-light);border-radius:100px;font-size:.8rem;color:var(--accent);border:1px solid rgba(59,110,80,.2)}
.hidrobr-pill{display:inline-flex;align-items:center;gap:.4rem;padding:.35rem .85rem;background:var(--card-bg);border:1px solid var(--border);border-radius:100px;font-size:.78rem;font-weight:600;color:var(--accent);letter-spacing:.03em;text-decoration:none;margin-bottom:1.75rem;transition:border-color .18s}
.hidrobr-pill:hover{border-color:var(--accent)}
.hidrobr-pill-dot{width:7px;height:7px;background:var(--accent);border-radius:50%}
.pub-list{display:flex;flex-direction:column}
.pub-item{display:grid;grid-template-columns:56px 1fr;gap:1.5rem;padding:1.5rem 0;border-bottom:1px solid var(--border);border-left:2px solid transparent;padding-left:1rem;margin-left:-1rem;transition:border-color .2s}
.pub-item:first-child{padding-top:0}.pub-item:last-child{border-bottom:none;padding-bottom:0}
.pub-item:hover{border-left-color:var(--accent)}
.pub-year{font-family:var(--font-display);font-size:.88rem;font-weight:300;color:var(--muted);padding-top:.2rem;line-height:1.4}
.pub-title{font-size:.97rem;font-weight:500;line-height:1.45;margin-bottom:.35rem}
.pub-title a{color:var(--text);text-decoration:none}.pub-title a:hover{color:var(--accent)}
.pub-badge{display:inline-block;padding:.12rem .55rem;background:#fdf3e3;color:var(--accent-amber);border-radius:4px;font-size:.66rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;margin-left:.5rem;vertical-align:middle}
.pub-type{display:inline-block;padding:.1rem .55rem;border-radius:4px;font-size:.66rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;margin-right:.4rem;vertical-align:middle}
.pub-type-livro,.pub-type-capitulo{background:#e8f0f8;color:#2a5f8a}
.pub-type-artigo{background:var(--accent-light);color:var(--accent)}
.pub-type-apresentacao{background:#f3e8f5;color:#7a3a8a}
.pub-type-relatorio{background:#fdf3e3;color:var(--accent-amber)}
.pub-meta{font-size:.83rem;color:var(--muted);line-height:1.5}
.pub-venue{font-style:italic}
.pub-subsection-title{font-family:var(--font-display);font-size:1.2rem;font-weight:400;font-style:italic;color:var(--muted);margin:2.5rem 0 0;padding-bottom:.75rem;border-bottom:1px solid var(--border)}
.pub-subsection-title:first-of-type{margin-top:0}
.projects-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem}
.project-card{background:var(--card-bg);border-radius:10px;padding:1.75rem;border:1px solid var(--border);transition:transform .18s,border-color .18s}
.project-card:hover{transform:translateY(-3px);border-color:var(--accent)}
.project-icon{font-size:1.5rem;margin-bottom:1rem;line-height:1}
.project-title{font-size:.97rem;font-weight:600;margin-bottom:.5rem;line-height:1.3}
.project-desc{font-size:.85rem;color:var(--muted);line-height:1.65;margin-bottom:1.1rem}
.project-links{display:flex;gap:1rem;flex-wrap:wrap}
.project-link{font-size:.8rem;font-weight:500;color:var(--accent);text-decoration:none}
.project-link:hover{text-decoration:underline}
.blog-list{display:flex;flex-direction:column}
.blog-item{display:flex;justify-content:space-between;align-items:baseline;gap:1.5rem;padding:1.25rem 0;border-bottom:1px solid var(--border);text-decoration:none;color:var(--text)}
.blog-item:first-child{padding-top:0}.blog-item:last-child{border-bottom:none;padding-bottom:0}
.blog-item:hover .blog-title{color:var(--accent)}
.blog-tag{font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--accent);margin-bottom:.3rem}
.blog-title{font-size:.97rem;font-weight:500;transition:color .15s;line-height:1.35}
.blog-date{font-size:.8rem;color:var(--muted);white-space:nowrap;flex-shrink:0}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:3.5rem;align-items:start}
.contact-text{font-size:.97rem;color:var(--muted);line-height:1.78}
.contact-text p+p{margin-top:1rem}
.contact-links{display:flex;flex-direction:column;gap:.6rem}
.contact-link{display:flex;align-items:center;gap:.85rem;text-decoration:none;color:var(--text);font-size:.88rem;padding:.8rem 1rem;background:var(--card-bg);border-radius:8px;border:1px solid var(--border);transition:border-color .18s,color .18s}
.contact-link:hover{border-color:var(--accent);color:var(--accent)}
.contact-icon{width:18px;text-align:center;flex-shrink:0}
footer{padding:2.25rem 0;text-align:center;font-size:.78rem;color:var(--muted);border-top:1px solid var(--border)}
@media(max-width:768px){nav{padding:0 1.25rem}.container{padding:0 1.25rem}#hero{padding:110px 0 64px}.about-grid{grid-template-columns:1fr}.about-photo{max-width:160px;aspect-ratio:1/1;border-radius:50%}.projects-grid{grid-template-columns:1fr}.contact-grid{grid-template-columns:1fr;gap:2rem}.pub-item{gap:1rem}}
@media(max-width:520px){.nav-links{display:none}.blog-item{flex-direction:column;gap:.25rem}.blog-date{font-size:.75rem}}
</style>
</head>
<body>
<nav id="navbar">
  <a href="#hero" class="nav-logo">F.C.V.</a>
  <ul class="nav-links">
    <li><a href="#about">Sobre</a></li>
    <li><a href="#publications">Publicações</a></li>
    <li><a href="#projects">Projetos</a></li>
    <li><a href="#blog">Blog</a></li>
    <li><a href="#contact">Contato</a></li>
  </ul>
</nav>
<main>

<section id="hero">
  <div class="container">
    <div class="hero-rule"></div>
    <p class="hero-eyebrow">${d.hero.eyebrow}</p>
    <h1 class="hero-name">Frederico<br><em>Campos Viana</em></h1>
    <p class="hero-tagline">${d.hero.tagline}</p>
    <div class="hero-actions">
      <a href="#contact" class="btn btn-primary">Entre em contato</a>
      <a href="#publications" class="btn btn-ghost">Publicações & Relatórios</a>
      <a href="https://hidrobr.com.br" target="_blank" class="btn btn-ghost">HIDROBR ↗</a>
    </div>
  </div>
</section>

<section id="about">
  <div class="container">
    <span class="section-label">quem sou eu</span>
    <h2 class="section-title">Sobre</h2>
    <div class="about-grid">
      <div class="about-photo">${photoSrc ? `<img src="${photoSrc}" alt="Frederico Campos Viana">` : ''}</div>
      <div class="about-text">
        <a href="${d.contact.institutionUrl}" target="_blank" class="hidrobr-pill">
          <span class="hidrobr-pill-dot"></span>
          PhD em Resiliência
        </a>
        ${d.about.paragraphs.map(p=>`<p>${p}</p>`).join('\n        ')}
        <div class="interests">
          <p class="interests-label">Temas de pesquisa</p>
          <div class="tags">${d.about.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="publications">
  <div class="container">
    <span class="section-label">produção científica & técnica</span>
    <h2 class="section-title">Publicações & Relatórios</h2>
    <div class="pub-list">
      <p class="pub-subsection-title">Livros & Capítulos</p>
      ${d.publications.books.map(pubRow).join('')}
      <p class="pub-subsection-title">Artigos & Conferências</p>
      ${d.publications.articles.map(pubRow).join('')}
    </div>
  </div>
</section>

<section id="projects">
  <div class="container">
    <span class="section-label">pesquisa aplicada · HIDROBR</span>
    <h2 class="section-title">Projetos</h2>
    <div class="projects-grid">${d.projects.map(projCard).join('')}</div>
  </div>
</section>

<section id="blog">
  <div class="container">
    <span class="section-label">análises & reflexões · HIDROBR</span>
    <h2 class="section-title">Blog</h2>
    <div class="blog-list">
      ${d.blog.map(p=>`
      <a href="${p.link}" target="_blank" class="blog-item">
        <div><div class="blog-tag">${p.tag}</div><div class="blog-title">${p.title}</div></div>
        <span class="blog-date">${p.date}</span>
      </a>`).join('')}
    </div>
  </div>
</section>

<section id="contact">
  <div class="container">
    <span class="section-label">vamos conversar</span>
    <h2 class="section-title">Contato</h2>
    <div class="contact-grid">
      <div class="contact-text">
        <p>${d.contact.text1}</p>
        <p>${d.contact.text2}</p>
        <p style="margin-top:1.25rem;font-size:.82rem;line-height:1.8">
          📍 ${d.contact.location}<br>
          🏢 <a href="${d.contact.institutionUrl}" target="_blank" style="color:var(--accent);text-decoration:none">HIDROBR</a><br>
          🎓 ${d.contact.degree}
        </p>
      </div>
      <div class="contact-links">
        <a href="mailto:${d.contact.email}" class="contact-link"><span class="contact-icon">✉️</span>${d.contact.email}</a>
        ${d.contact.links.map(l=>`<a href="${l.url}" target="_blank" class="contact-link"><span class="contact-icon">${l.icon}</span>${l.label}</a>`).join('\n        ')}
      </div>
    </div>
  </div>
</section>

</main>
<footer>
  <div class="container">© ${new Date().getFullYear()} Frederico Campos Viana · PhD em Resiliência</div>
</footer>
<script>
  const nav=document.getElementById('navbar');
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>20));
</script>
</body>
</html>`;
}

// ── Main App ────────────────────────────────────────────────────

const TABS = [
  {id:"hero",label:"🏠 Hero"},
  {id:"about",label:"👤 Sobre"},
  {id:"publications",label:"📚 Publicações"},
  {id:"projects",label:"🔬 Projetos"},
  {id:"blog",label:"✍️ Blog"},
  {id:"contact",label:"📬 Contato"},
];

export default function App() {
  const [data, setData] = useState(DEF);
  const [photo, setPhoto] = useState(null);
  const [tab, setTab] = useState("hero");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get(SK);
        if (r) setData(JSON.parse(r.value));
        const p = await window.storage.get(PK);
        if (p) setPhoto(p.value);
      } catch {}
      setLoading(false);
    })();
  }, []);

  const save = async () => {
    try {
      await window.storage.set(SK, JSON.stringify(data));
      if (photo) await window.storage.set(PK, photo);
      setStatus("saved");
      setTimeout(() => setStatus(null), 2500);
    } catch { setStatus("error"); }
  };

  const exportHTML = () => {
    const html = genHTML(data, photo);
    const blob = new Blob([html], {type:"text/html;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "site-frederico.html"; a.click();
    URL.revokeObjectURL(url);
  };

  const handlePhoto = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => setPhoto(ev.target.result);
    reader.readAsDataURL(f);
  };

  if (loading) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontFamily:"Inter,sans-serif",color:"#7a7060"}}>Carregando…</div>;

  return (
    <div style={{fontFamily:"Inter,sans-serif",minHeight:"100vh",background:"#f7f4ef",display:"flex",flexDirection:"column"}}>
      {/* Top bar */}
      <div style={{background:"#1c1913",color:"white",padding:"0 20px",height:54,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:16,color:"#e3ede6"}}>F.C.V.</span>
          <span style={{color:"#7a7060",fontSize:12}}>Painel de edição</span>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {status==="saved" && <span style={{fontSize:12,color:"#3b6e50",background:"#e3ede6",padding:"4px 10px",borderRadius:100}}>✓ Salvo</span>}
          {status==="error" && <span style={{fontSize:12,color:"#991b1b",background:"#fee2e2",padding:"4px 10px",borderRadius:100}}>Erro ao salvar</span>}
          <button onClick={save} style={s.btn("#3b6e50")}>💾 Salvar</button>
          <button onClick={exportHTML} style={s.btn("#b8762a")}>⬇ Exportar HTML</button>
        </div>
      </div>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* Sidebar */}
        <div style={{width:190,background:"white",borderRight:"1px solid #ddd8cd",display:"flex",flexDirection:"column",flexShrink:0,overflowY:"auto"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              width:"100%",textAlign:"left",padding:"12px 16px",border:"none",
              background:tab===t.id?"#e3ede6":"transparent",
              color:tab===t.id?"#3b6e50":"#1c1913",
              fontWeight:tab===t.id?600:400,
              cursor:"pointer",fontSize:13,
              borderLeft:tab===t.id?"3px solid #3b6e50":"3px solid transparent",
              transition:"all .15s"
            }}>{t.label}</button>
          ))}

          <div style={{margin:"16px",marginTop:"auto",borderTop:"1px solid #ddd8cd",paddingTop:16}}>
            <p style={{fontSize:11,color:"#7a7060",marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"}}>Foto</p>
            {photo && <img src={photo} alt="" style={{width:"100%",aspectRatio:"3/4",objectFit:"cover",objectPosition:"center 10%",borderRadius:6,marginBottom:8}} />}
            <label style={{display:"block",background:"#f7f4ef",border:"1px dashed #b8762a",borderRadius:6,padding:"10px",cursor:"pointer",textAlign:"center",fontSize:11,color:"#b8762a",fontWeight:600}}>
              {photo ? "Trocar foto" : "📷 Enviar foto"}
              <input type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}} />
            </label>
          </div>
        </div>

        {/* Content */}
        <div style={{flex:1,padding:24,overflowY:"auto"}}>
          <div style={{maxWidth:720}}>
            {tab==="hero" && <HeroEditor data={data.hero} onChange={v=>setData({...data,hero:v})} />}
            {tab==="about" && <AboutEditor data={data.about} onChange={v=>setData({...data,about:v})} />}
            {tab==="publications" && <PublicationsEditor data={data.publications} onChange={v=>setData({...data,publications:v})} />}
            {tab==="projects" && <ProjectsEditor data={data.projects} onChange={v=>setData({...data,projects:v})} />}
            {tab==="blog" && <BlogEditor data={data.blog} onChange={v=>setData({...data,blog:v})} />}
            {tab==="contact" && <ContactEditor data={data.contact} onChange={v=>setData({...data,contact:v})} />}
          </div>
        </div>
      </div>
    </div>
  );
}
