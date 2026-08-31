const modal=document.querySelector('#modal'),content=document.querySelector('#modalContent');
const entries=()=>JSON.parse(localStorage.getItem('mluEntries')||'[]');
const esc=s=>{const d=document.createElement('div');d.textContent=s||'';return d.innerHTML};
const themeData={
 galaxy:{name:'Galaxy ✨',accent:'#8c70ff',filter:'none'},
 dreamy:{name:'Dreamy 🌸',accent:'#e48ab7',filter:'saturate(.85) hue-rotate(300deg) brightness(1.08)'},
 ocean:{name:'Ocean 🌊',accent:'#48c8df',filter:'saturate(.85) hue-rotate(120deg)'},
 forest:{name:'Forest 🌿',accent:'#78b47d',filter:'saturate(.78) hue-rotate(70deg) brightness(.9)'},
 sunset:{name:'Sunset 🌅',accent:'#ed9365',filter:'saturate(1.2) hue-rotate(335deg) brightness(1.04)'},
 midnight:{name:'Midnight 🌙',accent:'#c69a4b',filter:'brightness(.68) saturate(.78)'}
};
const moods={Happy:'😊',Calm:'😌',Motivated:'🔥',Creative:'💡',Sad:'🌧️',Excited:'🥳'};
const musicTracks=[
 {name:'A Gentle Night',sub:'My Little Universe • Original',src:'assets/music/a-gentle-night.wav'},
 {name:'Dreamy Memories',sub:'My Little Universe • Original',src:'assets/music/dreamy-memories.wav'},
 {name:'Magical Garden',sub:'My Little Universe • Original',src:'assets/music/magical-garden.wav'},
 {name:'Backbone Remix',sub:'My Little Universe • Original',src:'assets/music/Backbone_Remix_Dj_Yash_Ft_Hardy_Sandhu.mp3'},
 {name:'Sapphire',sub:'My Little Universe • Original',src:'assets/music/Sapphire - (Raag.Fm).mp3'},
 {name:'You and Me',sub:'My Little Universe • Original',src:'assets/music/You And Me - Shubh.mp3'},
 {name:'Obsessed',sub:'My Little Universe • Original',src:'assets/music/Obsessed.mp3'},
 {name:'Shadow',sub:'My Little Universe • Original',src:'assets/music/Shadow_1.mp3'},
 {name:'Befikra',sub:'My Little Universe • Original',src:'assets/music/Befikra - Meet Bros, Aditi Singh Sharma, Natalie Ram, Thomson Andrews, Keshia Braganza, Gwan Dias, Ryan Dias 128 Kbps.mp3'},
 {name:'California Love',sub:'My Little Universe • Original',src:'assets/music/California_Love.mp3'},
 {name:'Distance Love',sub:'My Little Universe • Original',src:'assets/music/Distance_Love_Song_1.mp3'},
 {name:'Dreamy',sub:'My Little Universe • Original',src:'assets/music/dreamy-memories.mp3'},
 {name:'Farmaish',sub:'My Little Universe • Original',src:'assets/music/Farmaish - Laddi Chahal.mp3'},
 {name:'Guitar Sikhda',sub:'My Little Universe • Original',src:'assets/music/Guitar_Sikhda_1.mp3'},
 {name:'Gulab',sub:'My Little Universe • Original',src:'assets/music/Gulab.mp3'},
 {name:'Ik Tera',sub:'My Little Universe • Original',src:'assets/music/Ik_Tera_1.mp3'},
 {name:'Jogi',sub:'My Little Universe • Original',src:'assets/music/Jogi - Thiarajxtt & Bir (Mr-Punjab.Com).mp3'},
 {name:'Naach Meri Jaan',sub:'My Little Universe • Original',src:'assets/music/Naach Meri Jaan Tubelight 128 Kbps.mp3'},
 {name:'Sooraj Dooba Hain Roy',sub:'My Little Universe • Original',src:'assets/music/Sooraj Dooba Hain Roy 128 Kbps.mp3'},
 {name:'Tu Hi Das De',sub:'My Little Universe • Original',src:'assets/music/Tu_Hi_Das_De_1.mp3'},
 {name:'Unstoppable',sub:'My Little Universe • Original',src:'assets/music/Unstoppable-(Mr-Jat.in).mp3'}
];
let currentTrack=Number(localStorage.getItem('mluMusicTrack')||0);
let musicOn=false;
const bgMusic=document.querySelector('#bgMusic');
const volume=document.querySelector('#volume');
if(bgMusic && volume){bgMusic.volume=Number(volume.value);volume.addEventListener('input',()=>bgMusic.volume=Number(volume.value));}
function applyTrack(i){currentTrack=(i+musicTracks.length)%musicTracks.length;localStorage.setItem('mluMusicTrack',String(currentTrack));if(!bgMusic)return;bgMusic.src=musicTracks[currentTrack].src;const n=document.querySelector('#trackName');if(n)n.innerHTML=musicTracks[currentTrack].name+'<small>'+musicTracks[currentTrack].sub+'</small>';bgMusic.load();}
function changeTrack(step){const wasPlaying=bgMusic && !bgMusic.paused;applyTrack(currentTrack+step);if(wasPlaying)bgMusic.play().catch(()=>{});toast('♫ '+musicTracks[currentTrack].name);}
function openMusicLibrary(){openModal('<h2>🎵 Music Library</h2><p>Choose the soundtrack for your little universe.</p><div class="themeChoices">'+musicTracks.map((x,i)=>`<button class="themeChoice ${i===currentTrack?'selected':''}" onclick="selectTrack(${i})"><span>♫</span><strong>${x.name}</strong></button>`).join('')+'</div>');}
function selectTrack(i){const wasPlaying=bgMusic && !bgMusic.paused;applyTrack(i);closeModal();if(wasPlaying)bgMusic.play().catch(()=>{});toast('Now playing: '+musicTracks[currentTrack].name+' 🎵');}
function closeModal(){modal.classList.remove('open')}
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);requestAnimationFrame(()=>t.classList.add('show'));setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),250)},1900)}
function openModal(html){content.innerHTML=html;modal.classList.add('open')}
function write(){const author=localStorage.getItem('mluCharacter')||'Bugabu';const img=author==='Princess'?'assets/portraits/princess.jpg':author==='Prince'?'assets/portraits/prince.jpg':'assets/portraits/bugabu.jpg';openModal(`<h2>✍️ Today's Story</h2><div class="memoryAuthor"><img src="${img}" alt="${author}"><div><strong>Written by ${author}</strong><small>Your selected diary character will appear on this memory card.</small></div></div><input id="title" placeholder="Memory title"><textarea id="text" placeholder="Dear diary...\n\nWrite whatever is in your heart."></textarea><button class="save" onclick="saveEntry()">Save Memory ✨</button>`)}
function saveEntry(){const title=document.querySelector('#title').value.trim()||'A little memory',text=document.querySelector('#text').value.trim();if(!text)return toast('Write something first ✍️');const a=entries();const author=localStorage.getItem('mluCharacter')||'Bugabu'; const image=author==='Princess'?'assets/portraits/princess.jpg':author==='Prince'?'assets/portraits/prince.jpg':'assets/portraits/bugabu.jpg'; const mood=localStorage.getItem('mluMood')||'Happy'; a.unshift({title,text,author,image,mood,date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}),favorite:false});localStorage.setItem('mluEntries',JSON.stringify(a));closeModal();renderCards();toast('Memory saved ✨')}
function timeline(){
 const a=entries();
 openModal(`<h2>📖 Memory Timeline</h2>${a.length?a.map((x,i)=>`<div class="memory"><div class="memoryTop"><h3>${esc(x.title)}</h3><button class="star" onclick="toggleFavorite(${i})">${x.favorite?'★':'☆'}</button></div><small>${esc(x.date)}</small><div class="authorRow"><img class="authorAvatar" src="${esc(x.image||authorImage(x.author))}"><span>Written by <b class="authorTag">${esc(x.author||'Bugabu')}</b></span></div><p>${esc(x.text)}</p><div class="editActions"><button class="save" onclick="editMemory(${i})">✎ Edit</button><button class="danger" onclick="deleteMemory(${i})">🗑 Delete</button></div></div>`).join(''):'<div class="memory">Your timeline is waiting for its first story 🌙</div>'}`)
}
function authorImage(author){return author==='Princess'?'assets/portraits/princess.jpg':author==='Prince'?'assets/portraits/prince.jpg':'assets/portraits/bugabu.jpg'}
function editMemory(i){
 const x=entries()[i]; if(!x)return;
 const authors=['Princess','Bugabu','Prince'];
 openModal(`<h2>✎ Edit Memory</h2><input id="editTitle" value="${esc(x.title)}"><textarea id="editText">${esc(x.text)}</textarea><p style="color:#cbbbd4">Who wrote this memory?</p><div class="writerChoices">${authors.map(n=>`<button class="writerChoice ${n===(x.author||'Bugabu')?'selected':''}" data-writer="${n}" onclick="pickWriter('${n}')"><img src="${authorImage(n)}"><span>${n}</span></button>`).join('')}</div><p id="editWriter" style="color:#ffd889">${esc(x.author||'Bugabu')}</p><div class="editActions"><button class="save" onclick="updateMemory(${i})">💾 Save Changes</button><button class="danger" onclick="deleteMemory(${i})">🗑 Delete</button></div>`)
}
function pickWriter(n){document.querySelectorAll('.writerChoice').forEach(b=>b.classList.toggle('selected',b.dataset.writer===n));document.querySelector('#editWriter').textContent=n}
function updateMemory(i){const a=entries(),x=a[i];if(!x)return;const title=document.querySelector('#editTitle').value.trim()||'A little memory',text=document.querySelector('#editText').value.trim();if(!text)return toast('Memory cannot be empty ✍️');const author=document.querySelector('.writerChoice.selected')?.dataset.writer||x.author||'Bugabu';x.title=title;x.text=text;x.author=author;x.image=authorImage(author);x.date=x.date||new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});localStorage.setItem('mluEntries',JSON.stringify(a));closeModal();renderCards();toast('Memory updated ✨')}
function deleteMemory(i){if(!confirm('Delete this memory?'))return;const a=entries();a.splice(i,1);localStorage.setItem('mluEntries',JSON.stringify(a));closeModal();renderCards();toast('Memory deleted 🗑️')}
function favorites(){const a=entries().filter(x=>x.favorite);openModal(`<h2>⭐ Favorites</h2>${a.length?a.map(x=>`<div class="memory"><h3>⭐ ${esc(x.title)}</h3><small>${esc(x.date)}</small><p>${esc(x.text)}</p></div>`).join(''):'<div class="memory">No favorites yet. Tap ☆ on a memory to keep it special.</div>'}`)}
function toggleFavorite(i){const a=entries();a[i].favorite=!a[i].favorite;localStorage.setItem('mluEntries',JSON.stringify(a));timeline();renderCards()}
function characters(){const selected=localStorage.getItem('mluCharacter')||'Bugabu';openModal(`<h2>👑 My Characters</h2><p>Choose who greets you in your diary.</p><div class="characterChoices">${[['Princess','Keeper of Dreams','💗','assets/princess.png'],['Bugabu','Your Diary Buddy','🐻','assets/bugabu.png'],['Prince','Bearer of Strength','💙','assets/prince.png']].map(c=>`<button class="characterChoice ${selected===c[0]?'selected':''}" data-char="${c[0]}" onclick="selectCharacter('${c[0]}')"><img src="${c[3]}" alt="${c[0]}"><strong>${c[0]}</strong><small>${c[1]}</small></button>`).join('')}</div><p class="selectedLine">Selected: <b id="selectedChar">${esc(selected)}</b></p>`)}
function selectCharacter(name){localStorage.setItem('mluCharacter',name);document.querySelectorAll('.characterChoice').forEach(b=>b.classList.toggle('selected',b.dataset.char===name));setAvatar(name);const line=document.querySelector('#selectedChar');if(line)line.textContent=name;toast(name+' selected ✨')}
function openThemes(){const current=localStorage.getItem('mluTheme')||'galaxy';openModal(`<h2>🎨 Change Theme</h2><p>Pick a complete atmosphere for your little universe.</p><div class="themeChoices">${Object.entries(themeData).map(([k,v])=>`<button class="themeChoice ${current===k?'selected':''}" onclick="setTheme('${k}')"><span>${v.name.split(' ')[1]||'✨'}</span><strong>${v.name}</strong></button>`).join('')}</div>`)}
function setTheme(t){if(!themeData[t])t='galaxy';document.body.dataset.theme=t;document.querySelector('#themeName').textContent=themeData[t].name;document.documentElement.style.setProperty('--theme-accent',themeData[t].accent);const art=document.querySelector('.artPanel img');art.style.filter=themeData[t].filter;localStorage.setItem('mluTheme',t);closeModal();toast('Theme changed to '+themeData[t].name)}
function chooseMood(){const saved=localStorage.getItem('mluMood')||'Happy';openModal(`<h2>😊 Today's Mood</h2><p>Pick the mood for today.</p><div class="themeChoices">${Object.entries(moods).map(([x,e])=>`<button class="themeChoice ${saved===x?'selected':''}" onclick="saveMood('${x}')"><span>${e}</span><strong>${x}</strong></button>`).join('')}</div>`)}
function saveMood(m){localStorage.setItem('mluMood',m);const label=document.querySelector('#moodLabel');label.textContent=m+' ♥';const btn=document.querySelector('.mood button');btn.firstChild.textContent=moods[m];closeModal();toast('Mood saved: '+m+' '+moods[m])}
function searchMemories(){openModal(`<h2>🔎 Search Memories</h2><input id="searchBox" placeholder="Search by title or text..." oninput="runSearch()"><div id="searchResults" class="list"></div>`);runSearch()}
function runSearch(){const q=(document.querySelector('#searchBox')?.value||'').toLowerCase();const a=entries().filter(x=>(x.title+' '+x.text).toLowerCase().includes(q));document.querySelector('#searchResults').innerHTML=a.length?a.map(x=>`<div class="memory"><h3>${esc(x.title)}</h3><small>${esc(x.date)}</small></div>`).join(''):'<div class="memory">No memories found.</div>'}
function renderCards(){
 const a=entries();
 const fallback=[
  {title:'A beautiful sunset',date:'30 May 2026',author:'Princess',image:'assets/portraits/princess.jpg',mood:'Happy',favorite:false},
  {title:'Late night thoughts',date:'29 May 2026',author:'Bugabu',image:'assets/portraits/bugabu.jpg',mood:'Calm',favorite:false},
  {title:'Grateful for today',date:'28 May 2026',author:'Prince',image:'assets/portraits/prince.jpg',mood:'Happy',favorite:false}
 ];
 const data=a.length?a.slice(0,3).map((x,i)=>({
   ...x,
   author:x.author||'Bugabu',
   image:x.image||(['assets/princess.png','assets/bugabu.png','assets/prince.png'][i%3]),
   mood:x.mood||'Happy',index:i
 })):fallback;
 document.querySelector('#cards').innerHTML=data.map(x=>`<article class="cardMemory" onclick="openMemory(${x.index!==undefined?x.index:'null'})">
   <img src="${esc(x.image)}" alt="${esc(x.author)} illustration">
   <div class="ct">
     <h4>${esc(x.title)}</h4>
     <small>${esc(x.date)} &nbsp; ${moods[x.mood]||'✨'} ${esc(x.mood)}</small>
     <div class="authorRow"><img class="authorAvatar" src="${esc(x.image)}" alt=""><span>Written by <b class="authorTag">${esc(x.author)}</b></span></div>
     ${x.index!==undefined?`<button class="miniStar" title="Favorite" onclick="event.stopPropagation();toggleFavorite(${x.index})">${a[x.index].favorite?'★':'☆'}</button><button class="miniEdit" title="Edit" onclick="event.stopPropagation();editMemory(${x.index})">✎</button>`:''}
   </div>
 </article>`).join('');
}
function openMemory(i){
 if(i===null){toast('This sample memory is ready to inspire you ✨');return}
 const x=entries()[i]; if(!x)return;
 const img=x.image||((x.author==='Princess')?'assets/portraits/princess.jpg':(x.author==='Prince')?'assets/portraits/prince.jpg':'assets/portraits/bugabu.jpg');
 openModal(`<h2>📖 ${esc(x.title)}</h2><div class="memoryAuthor"><img src="${img}" alt="${esc(x.author||'Bugabu')}"><div><strong>Written by ${esc(x.author||'Bugabu')}</strong><small>${esc(x.date)} · ${moods[x.mood]||'✨'} ${esc(x.mood||'Happy')}</small></div></div><div class="memory"><p>${esc(x.text)}</p></div><button class="save" onclick="toggleFavorite(${i});closeModal()">${x.favorite?'★ Remove from Favorites':'☆ Add to Favorites'}</button>`);
}
let drawTool='pen',drawing=false,drawCtx,drawCanvas;
function openDrawing(){
 const m=document.querySelector('#drawModal');m.classList.add('open');setTimeout(()=>{
  drawCanvas=document.querySelector('#drawCanvas');const r=drawCanvas.getBoundingClientRect(),d=devicePixelRatio||1;drawCanvas.width=r.width*d;drawCanvas.height=r.height*d;drawCtx=drawCanvas.getContext('2d');drawCtx.scale(d,d);drawCtx.fillStyle='#fff';drawCtx.fillRect(0,0,r.width,r.height);
  const pos=e=>{const b=drawCanvas.getBoundingClientRect();return[e.clientX-b.left,e.clientY-b.top]};
  drawCanvas.onpointerdown=e=>{drawing=true;drawCtx.beginPath();let [x,y]=pos(e);drawCtx.moveTo(x,y)};
  drawCanvas.onpointermove=e=>{if(!drawing)return;let [x,y]=pos(e);drawCtx.lineWidth=+document.querySelector('#brushSize').value;drawCtx.lineCap='round';drawCtx.strokeStyle=drawTool==='eraser'?'#fff':document.querySelector('#brushColor').value;drawCtx.lineTo(x,y);drawCtx.stroke()};
  drawCanvas.onpointerup=()=>drawing=false;drawCanvas.onpointerleave=()=>drawing=false;
 },50);
}
function closeDraw(){document.querySelector('#drawModal').classList.remove('open');drawing=false}
function clearDrawing(){if(!drawCtx)return;const r=drawCanvas.getBoundingClientRect();drawCtx.clearRect(0,0,r.width,r.height);drawCtx.fillStyle='#fff';drawCtx.fillRect(0,0,r.width,r.height)}
function saveDrawing(){if(!drawCanvas)return;const a=document.createElement('a');a.download='my-little-universe-drawing.png';a.href=drawCanvas.toDataURL('image/png');a.click()}
function go(page){document.querySelectorAll('.sidebar nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===page));if(page==='home'){closeModal();return}if(page==='write')write();else if(page==='timeline')timeline();else if(page==='favorites')favorites();else if(page==='characters')characters();else if(page==='settings')openThemes();else if(page==='draw')openDrawing()}
document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.page)));
document.querySelector('#changeTheme').onclick=openThemes;
document.querySelector('.topBtns button:first-child').onclick=searchMemories;
document.querySelector('.topBtns button:nth-child(2)').onclick=openMusicLibrary;
document.querySelector('.mood button').onclick=chooseMood;
let d=new Date();document.querySelector('#date').textContent=d.toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});document.querySelector('#day').textContent=d.toLocaleDateString('en-IN',{weekday:'long'});
function setAvatar(name){const avatar=document.querySelector('.avatar');avatar.innerHTML=`<img src="assets/${name.toLowerCase()}.png" alt="${name}">`}
async function toggleMusic(){
 if(!bgMusic)return;
 if(bgMusic.paused){try{await bgMusic.play();musicOn=true;const b=document.querySelector('#musicStatus');if(b)b.textContent='❚❚';toast('♫ '+musicTracks[currentTrack].name+' is playing')}catch(e){toast('Browser ne music start nahi kiya — Play dobara dabao 🎵')}}
 else{bgMusic.pause();musicOn=false;const b=document.querySelector('#musicStatus');if(b)b.textContent='▶';toast('Music paused ⏸')}
}

applyTrack(currentTrack);
const savedTheme=localStorage.getItem('mluTheme')||'galaxy';setTheme(savedTheme);const savedChar=localStorage.getItem('mluCharacter')||'Bugabu';setAvatar(savedChar);document.querySelector('#moodLabel').textContent=(localStorage.getItem('mluMood')||'Happy')+' ♥';document.querySelector('.mood button').firstChild.textContent=moods[localStorage.getItem('mluMood')||'Happy'];renderCards();
