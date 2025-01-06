const verifyEmailTemplate = ({ name, url })=>{
    return`
<p>Cher(e) ${name},</p>    
<p>Merci de vous être inscrit(e) sur MERN Ecom APP.</p>   
<a href=${url} style="color:black;background :orange;margin-top : 10px,padding:20px,display:block">
    Verifier Mon Email
</a>
`
}

module.exports = verifyEmailTemplate