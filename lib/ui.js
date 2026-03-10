export const styles = {

page:{
height:"100vh",
width:"100vw",
display:"flex",
justifyContent:"center",
alignItems:"center",
backgroundImage:"url('/logo.png')",
backgroundSize:"cover",
backgroundPosition:"center",
backgroundRepeat:"no-repeat",
fontFamily:"Arial"
},

window:{
width:"260px",
padding:"20px",
borderRadius:"14px",
background:"rgba(0,0,0,0.45)",
backdropFilter:"blur(14px)",
WebkitBackdropFilter:"blur(14px)",
border:"1px solid rgba(192,192,192,0.35)",
boxShadow:"0 8px 30px rgba(0,0,0,0.45)",
display:"flex",
flexDirection:"column",
alignItems:"center"
},

title:{
fontSize:"18px",
marginBottom:"14px",
color:"#C0C0C0",
textAlign:"center"
},

input:{
width:"100%",
padding:"8px",
marginBottom:"8px",
borderRadius:"6px",
border:"1px solid rgba(255,255,255,0.25)",
background:"rgba(255,255,255,0.10)",
color:"#C0C0C0",
fontSize:"13px",
outline:"none"
},

button:{,
width:"100%",
padding:"8px",
background:"rgba(255,255,255,0.15)",
color:"#C0C0C0",
border:"1px solid rgba(255,255,255,0.35)",
borderRadius:"6px",
fontSize:"13px",
cursor:"pointer"
},
error:{
marginTop:"10px",
color:"#ffbaba",
fontSize:"13px",
textAlign:"center"
}

}
}
