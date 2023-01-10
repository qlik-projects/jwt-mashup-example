async function main() {
    loginRes = await login();
    $("#logo").toggleClass("hide");
    $("#loader").toggleClass("hide")

    const htmlCode = `<iframe src="${tenant}/single/?appid=${appId}&sheet=${sheetId}&identity=anon_mashup" height="750" width="100%" frameborder="0"><iframe>`
        
    document.getElementById('qlikFrame').innerHTML = htmlCode;
}

main();