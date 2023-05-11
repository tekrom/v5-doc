document.querySelectorAll('.folder').forEach(el => {
    el.addEventListener("click", function (e) {
        if (!e.target.closest("[class*='file-type-']")) {
            e.stopPropagation();
            this.classList.toggle("active")
        }
    });
});

document.querySelector('.btn-open-all-close').addEventListener("click", function (e) {
    this.classList.toggle('active'); if (this.classList.contains('active')) {
        document.querySelectorAll('.folder').forEach(el => {
            el.classList.remove('active')
        });
    } else {
        document.querySelectorAll('.folder').forEach(el => {
            el.classList.add('active')
        });
    }
});

Fancybox.bind("[data-fancybox]", {});

function fullScreen() {
    window.open("https://v5-doc.tsoftthemes.com/tree-folder/", "_blank", "toolbar=no,scrollbars=yes,resizable=yes,width=1200,height=600");
}