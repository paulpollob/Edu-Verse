import React from 'react';

const PDFChat = () => {
    const pdfUpload = (event) =>
    {
        event.preventDefault();
        // console.log("HK: ", event.target.input)
        const input = event.target.input
        let file = input.files[0];
        if (file != undefined && file.type == "application/pdf") {
            let fr = new FileReader(); // Create a new FileReader object
            fr.readAsDataURL(file); // Read the file as data URL
            fr.onload = () => {
                let res = fr.result; // Get the result of file reading
                extractText(res, false, event); // Extract text without password 
                 
            }
        } else {
            alert("Select a valid PDF file");
        }
    }

    let alltext = [];

    async function extractText(url, pass, event) {
        try{
            const pdf = await pdfjsLib.getDocument(url).promise; // Get the PDF document without password
            let pages = pdf.numPages;
            for (let i = 1; i <= pages; i++) {
                let page = await pdf.getPage(i); // Get the page object for each page
                let txt = await page.getTextContent(); // Get the text content of the page
                let text = txt.items.map((s) => s.str).join(""); // Concatenate the text items into a single string
                alltext.push(text); // Add the extracted text to the array
            }
            // alltext.map((e, i) => {
            //     alert("HKK")
            //     select.innerHTML += `<option value="${i+1}">${i+1}</option>`; // Add options for each page in the page selection dropdown
            // });
            afterProcess(event);
        }   
        catch (err) {
            alert(err.message);
        }
    }

    function afterProcess(event) {
        const answer = event.target.parentNode.children[1]

         alltext.map((e, i) => { 
                answer.innerHTML += alltext[i]+` `; // Add options for each page in the page selection dropdown
            });
        // console.log("HK: ", event.target.parentNode.children[1])
        // const pdftext = even
        // pdftext.value = alltext[select.value - 1]; // Display the extracted text for the selected page
        // download.href = "data:text/plain;charset=utf-8," + encodeURIComponent(alltext[select.value - 1]); // Set the download link URL for the extracted text
        // afterupload.style.display = "flex"; // Display the result section
        // document.querySelector(".another").style.display = "unset"; // Display the "Extract Another PDF" button
    }
    return (
        <div className=''>
            Hare Krishna From pdf
            <form className='flex' onSubmit={pdfUpload}>
                <input name='input' type='file' accept="application/pdf, application/vnd.ms-excel" placeholder='upload pdf' className='rounded-s-lg bg-blue-400 text-slate-50'/>
                <button type='submit' className='border rounded-none rounded-e-lg bg-blue-400 text-slate-50 px-5'>Upload</button>
            </form>

            <div>
                <Answer />
            </div>
        </div>
    );
};


const Answer = () =>
{
    return (
        <div name="answer">
            answer
        </div>
    )
}

export default PDFChat;