window.onload = function () {

    let rightArray = []
    let leftArray = []

    initialAjax()

    function initialAjax() {

        $.ajax({
            url: "products.json",
            method: "GET",
            type: "json",
            success: function (data) {

                leftArray = data

                fillLeftBracket(data)
            },
            error: function (xhr, status, msg) {

                console.error(xhr);
                console.error(status);
                console.error(msg);
            }
        })
    }

    $(".myLink").click(function (e) {
        e.preventDefault();
    })

    $(document).on("click", ".moveRight", function () {

        let niz = new Array()

        let chbs = document.querySelectorAll(".productL")

        for (let i = 0; i < chbs.length; i++) {

            if (chbs[i].checked) {

                for (let j = 0; j < leftArray.length; j++) {

                    if (chbs[i].value == leftArray[j].id) {

                        rightArray.push(leftArray[j]);
                    }
                }

                niz.push(parseInt(chbs[i].value))
            }
        }

        for (let i = 0; i < leftArray.length; i++) {

            if (niz.indexOf(leftArray[i].id) !== -1) {

                leftArray.splice(i, 1);

                i--;
            }
        }

        fillRightBracket(rightArray);

        fillLeftBracket(leftArray);
    })

    $(document).on("click", ".moveLeft", function () {

        let niz = new Array()

        let chbs = document.querySelectorAll(".productR")

        for (let i = 0; i < chbs.length; i++) {

            if (chbs[i].checked) {

                for (let j = 0; j < rightArray.length; j++) {

                    if (chbs[i].value == rightArray[j].id) {

                        leftArray.push(rightArray[j]);
                    }
                }

                niz.push(parseInt(chbs[i].value))
            }
        }

        for (let i = 0; i < rightArray.length; i++) {

            if (niz.indexOf(rightArray[i].id) !== -1) {

                rightArray.splice(i, 1);

                i--;
            }
        }

        fillRightBracket(rightArray);

        fillLeftBracket(leftArray);
    })

    $(document).on('click', ".sendToBackend", function () {

        if (rightArray.length != 0) {
            alert("Data has been sent to server side for render!")
            window.location.href = "https://milutinvelisic.github.io/project-JS/";
        } else {
            alert("Cannot send nothing to server side!")
        }

    })

    function fillLeftBracket(data) {
        let html = ''

        for (const d of data) {
            html += `<div class="inputs">
                        <label for="">${d.name}</label>
                        <input type="checkbox" class="productL" name="productL" id="${d.id}" value="${d.id}">
                    </div>`
        }

        document.querySelector(".bracketLeft").innerHTML = html
    }

    function fillRightBracket(data) {
        let html = ''

        for (const d of data) {
            html += `<div class="inputs">
                        <label for="">${d.name}</label>
                        <input type="checkbox" class="productR" name="productR" id="${d.id}" value="${d.id}">
                    </div>`
        }

        document.querySelector(".bracketRight").innerHTML = html
    }
}