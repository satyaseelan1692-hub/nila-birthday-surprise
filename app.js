const el=id=>document.getElementById(id);
const questions=[
 {title:'Where did we<br><em>first meet?</em>',hint:'Every love story starts somewhere. Remember ours?',choices:['At a café','On the street','At college','At a party'],correct:1,reply:'Yes! One ordinary street. The beginning of my favorite story. ♡'},
 {title:'What’s your idea of<br><em>a perfect day with me?</em>',hint:'No wrong answers here. Just a little daydream about us.',choices:['A long drive and our favorite songs','A cozy movie night together','A little adventure somewhere new','Anywhere, as long as it’s with you'],reply:'A whole day with you? That already sounds perfect. ♡'},
 {title:'If our love were a movie,<br><em>what would you call it?</em>',hint:'You’re the leading lady. You get to choose the title.',choices:['My Favorite Person','A Million Little Moments','You, Me & Forever','The Best Kind of Love'],reply:'Whatever the title, you’ll always be my favorite part. ♡'},
 {title:'What should we collect<br><em>more of together?</em>',hint:'Here’s to everything still waiting for us.',choices:['Sunsets and long walks','Silly photos and inside jokes','Adventures and new places','All of these, with you'],reply:'Here’s to a lifetime of little moments worth keeping. ♡'},
 {title:'Why did you fall<br><em>in love with me?</em>',hint:'A little reason. A big feeling. Tell me in your own words.',note:true}
];
let step=0,answers=Array(questions.length).fill(null),confirmed=false;
function show(id,focus){document.querySelectorAll('.screen').forEach(s=>s.hidden=s.id!==id);window.scrollTo({top:0,behavior:'instant'});if(focus)el(focus).focus({preventScroll:true});}
function question(n){step=n;confirmed=false;const q=questions[n];el('questionHeading').innerHTML=q.title;el('questionHint').textContent=q.hint;el('stepLabel').textContent=`LITTLE LOVE NOTE ${String(n+1).padStart(2,'0')} / 05`;el('progress').replaceChildren(...questions.map((_,i)=>{const p=document.createElement('i');p.className=i<=n?'active':'';return p;}));el('choices').replaceChildren();el('noteField').hidden=!q.note;el('choiceFeedback').textContent='';el('continue').textContent=q.note?'My surprise is waiting  →':'Keep going  →';el('continue').disabled=!q.note;el('loveAnswer').required=!!q.note;
 if(q.note){el('loveAnswer').value=answers[n]||'';}else q.choices.forEach((text,i)=>{const b=document.createElement('button');b.type='button';b.className='choice';b.setAttribute('aria-pressed','false');const letter=document.createElement('span');letter.className='choice-letter';letter.textContent='ABCD'[i];const label=document.createElement('span');label.textContent=text;b.append(letter,label);b.addEventListener('click',()=>select(i));el('choices').append(b);});
 show('questions','questionHeading');if(!q.note&&answers[n]!==null)select(answers[n]);
}
function select(i){const q=questions[step];document.querySelectorAll('.choice').forEach((b,j)=>{b.classList.toggle('selected',i===j);b.setAttribute('aria-pressed',String(i===j));});if(q.correct!==undefined&&i!==q.correct){confirmed=false;el('choiceFeedback').textContent='Almost, my love. Think of the street where our story began. ♡';el('continue').disabled=true;return;}answers[step]=i;confirmed=true;el('choiceFeedback').textContent=q.reply;el('continue').disabled=false;}
el('start').addEventListener('click',()=>question(0));
el('questionForm').addEventListener('submit',e=>{e.preventDefault();if(questions[step].note){const answer=el('loveAnswer').value.trim();if(!answer){el('choiceFeedback').textContent='A few words from your heart are all it takes. ♡';el('loveAnswer').focus();return;}answers[step]=answer;show('ready','readyHeading');}else if(confirmed)question(step+1);});
el('back').addEventListener('click',()=>step>0?question(step-1):show('welcome','start'));
el('reveal').addEventListener('click',()=>{show('cinema','filmHeading');el('movie').play().catch(()=>{el('videoStatus').textContent='Press play to start your surprise. ♡';});});
el('movie').addEventListener('playing',()=>{el('videoStatus').textContent='';});
el('movie').addEventListener('error',()=>{el('videoStatus').textContent='The video couldn’t load. Try the “Open video” link below.';});
el('replay').addEventListener('click',()=>{el('movie').currentTime=0;el('movie').play().catch(()=>{el('videoStatus').textContent='Press play to watch again.';});});
function restart(){el('movie').pause();el('movie').currentTime=0;answers=Array(questions.length).fill(null);el('questionForm').reset();show('welcome','start');}
el('restart').addEventListener('click',restart);document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();restart();});
