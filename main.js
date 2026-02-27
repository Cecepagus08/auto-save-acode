"use strict";(()=>{var d={$schema:"https://acode.app/schema/plugin/v0.1.0.json",id:"sukcode.auto-save",name:"Auto Save",main:"dist/main.js",version:"1.0.0",repository:"https://github.com/Cecepagus08/auto-save-acode",icon:"icon.png",minVersionCode:290,license:"MIT",keywords:["auto-save","automatic-save","file-save","code-editor","developer-tools","sukcode","acode"],price:0,permissions:[],author:{name:"sukcode",email:"",github:"Cecepagus08"}};var c=class{async init(a,o){let{editor:n}=editorManager;if(this.settings={enabled:!0,delay:800,maxInterval:5e3,notification:!1},this.cacheFile=o,this.cacheFile)try{let t=JSON.parse(await this.cacheFile.readFile());this.settings={...this.settings,...t}}catch{}this.saveSettings=async()=>{this.cacheFile&&await this.cacheFile.writeFile(JSON.stringify(this.settings))},this.updateStatus=t=>{let e=document.querySelector("#as-status");e&&(e.textContent="Status: "+t)},this.showSaveBox=(t="Saved")=>{this.activeNotif&&this.activeNotif.remove();let e=document.createElement("div");Object.assign(e.style,{position:"fixed",top:"70px",left:"50%",transform:"translateX(-50%) translateY(-8px)",display:"flex",alignItems:"center",gap:"8px",padding:"8px 14px",borderRadius:"12px",background:"rgba(32,33,35,0.95)",border:"1px solid rgba(255,255,255,0.08)",backdropFilter:"blur(8px)",color:"#e5e5e5",fontSize:"13px",boxShadow:"0 6px 20px rgba(0,0,0,0.25)",opacity:"0",transition:"all 0.2s ease",zIndex:"99999"});let i=document.createElement("div");Object.assign(i.style,{width:"8px",height:"8px",borderRadius:"3px",background:"#22c55e"});let r=document.createElement("span");r.textContent=t,e.append(i,r),document.body.appendChild(e),this.activeNotif=e,requestAnimationFrame(()=>{e.style.opacity="1",e.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{e.style.opacity="0",e.style.transform="translateX(-50%) translateY(-8px)",setTimeout(()=>{e.remove(),this.activeNotif=null},200)},900)};let l=acode.require("sidebarApps");if(acode.addIcon("auto-save",this.baseUrl+"icon.png"),l.add("auto-save","auto-save-sidebar","Auto Save",t=>{let e=document.createElement("div");e.style.padding="15px",e.style.color="white",e.innerHTML=`
          <h2 style="margin-bottom:15px;">Auto Save</h2>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">
            <span>Enable</span>
            <label class="switch">
              <input type="checkbox" id="as-enabled" ${this.settings.enabled?"checked":""}>
              <span class="slider"></span>
            </label>
          </div>

          <div style="margin-bottom:15px;">
            <label style="font-size:13px;opacity:.8;">Delay (ms)</label>
            <input type="number" id="as-delay" value="${this.settings.delay}"
              style="width:100%;margin-top:6px;padding:8px;border-radius:8px;border:1px solid #3a3a3a;background:#1f1f1f;color:white;" />
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
            <span>Notification</span>
            <label class="switch">
              <input type="checkbox" id="as-notif" ${this.settings.notification?"checked":""}>
              <span class="slider"></span>
            </label>
          </div>

          <div id="as-status"
            style="font-size:12px;padding:6px 10px;border-radius:6px;background:#2b2b2b;text-align:center;opacity:.8;">
            Status: Idle
          </div>
        `,t.append(e),e.querySelector("#as-enabled").onchange=i=>{this.settings.enabled=i.target.checked,this.saveSettings(),this.settings.enabled&&n&&n.session.getUndoManager().hasUndo()&&this.performSave()},e.querySelector("#as-delay").onchange=i=>{this.settings.delay=parseInt(i.target.value)||800,this.saveSettings()},e.querySelector("#as-notif").onchange=i=>{this.settings.notification=i.target.checked,this.saveSettings()}}),!document.getElementById("auto-save-style")){let t=document.createElement("style");t.id="auto-save-style",t.textContent=`
        .switch { position: relative; display: inline-block; width: 40px; height: 22px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; inset: 0; background-color: #444; transition: .3s; border-radius: 34px; }
        .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
        input:checked + .slider { background-color: #4caf50; }
        input:checked + .slider:before { transform: translateX(18px); }
      `,document.head.appendChild(t)}this.fastTimer=null,this.performSave=()=>{acode.exec("save"),this.settings.notification&&this.showSaveBox("Auto Saved"),this.updateStatus("Saved")},this.changeHandler=()=>{this.settings.enabled&&(this.updateStatus("Typing..."),this.fastTimer&&clearTimeout(this.fastTimer),this.fastTimer=setTimeout(()=>{this.performSave()},this.settings.delay))},editorManager.on("file-content-changed",this.changeHandler)}async destroy(){editorManager.off("file-content-changed",this.changeHandler),this.fastTimer&&clearTimeout(this.fastTimer),this.activeNotif&&this.activeNotif.remove()}};if(window.acode){let s=new c;acode.setPluginInit(d.id,async(a,o,{cacheFile:n})=>{a.endsWith("/")||(a+="/"),s.baseUrl=a,await s.init(o,n)}),acode.setPluginUnmount(d.id,()=>{s.destroy()})}})();
