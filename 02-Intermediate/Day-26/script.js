console.log(marked);
document.getElementById("convert").addEventListener("click", function () {
  const markdownText = document.getElementById("markdown-prev").value;
  document.getElementById("preview").innerHTML = marked.parse(markdownText);
});
