import React, { useContext, useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { Context } from '../../Context/EduContext';

const PDFChat = () => {
    const { tcLeftRoute, setTcLeftRoute } = useContext(Context);
    setTcLeftRoute(2);


    const [upload, setUpload] = useState(true);
    const pdfUpload = (event) => {
        event.preventDefault();
        setUpload(!upload);
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
    const editPdf = (event) => {
        event.preventDefault();
        setUpload(!upload);
    }

    let alltext = [];

    async function extractText(url, pass, event) {
        try {
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
            answer.innerHTML += alltext[i] + ` `; // Add options for each page in the page selection dropdown
        });
        // console.log("HK: ", event.target.parentNode.children[1])
        // const pdftext = even
        // pdftext.value = alltext[select.value - 1]; // Display the extracted text for the selected page
        // download.href = "data:text/plain;charset=utf-8," + encodeURIComponent(alltext[select.value - 1]); // Set the download link URL for the extracted text
        // afterupload.style.display = "flex"; // Display the result section
        // document.querySelector(".another").style.display = "unset"; // Display the "Extract Another PDF" button
    }

    return (
        <div className='h-full'>
            <form className='w-full flex ' onSubmit={upload ? pdfUpload : editPdf}>
                <input name='input' type='file' accept="application/pdf, application/vnd.ms-excel" placeholder='upload pdf' className='border-none rounded-s-lg bg-blue-50 text-slate-900' disabled={upload ? false : true} />
                <button type='submit' className='border rounded-none rounded-e-lg bg-blue-50 text-slate-900 px-5 '>{upload ? "Upload PDF" : "Upload Another"}</button>
            </form>
            {/* <form className='flex' onSubmit={pdfUpload}>
                <input name='input' type='file' accept="application/pdf, application/vnd.ms-excel" placeholder='upload pdf' className='rounded-s-lg bg-blue-400 text-slate-50' disabled/>
                <button type='submit' className='border rounded-none rounded-e-lg bg-blue-400 text-slate-50 px-5'>Upload</button>
            </form> */}

            <div className='w-full border my-3'></div>

            <div className='h-full'>
                <Chat></Chat>
            </div>
        </div>
    );
};




const Chat = () => {



    const [flg, setFlg] = useState(0);
    const [msges, setMsges] = useState([])
    const send = (event) => {
        event.preventDefault();
        const msg = event.target.msg;
        setMsges([...msges, { "type": "answer", "details": msg.value }])
        msg.value = ""
    }
    useEffect(() => {

        // const msg = () => {

        //     fetch('http://192.168.1.6:8000/chatGemini', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ 'user': msges[msges.length - 1]?.details })
        //     })
        //         .then(res => res.json())
        //         .then((data) => { setMsges([...msges, { 'type': 'answer', 'details': data.response }]); setLoading(false) })
        //         .catch((error) => console.log("Error:", error));



        // }

        // if (flg != 0) msg();



    }, [flg]);



    return (
        <div className='flex flex-col items-center justify-end border h-96 rounded-lg'>
            <div id='chat' className=' flex flex-col w-full h-full overflow-auto scroll-m-6 p-6 '>

                <CreateMsg msges={msges}></CreateMsg>

            </div>
            <form onSubmit={send} className=' p-5 flex justify-between items-center gap-3 w-full'>
                <img className='rounded-full h-10 w-10' src='https://i.imgur.com/asLPUCK.jpg'></img>
                <input name='msg' type='text' placeholder='Write Your Message...' className='border rounded-lg w-full' />
                <button type='submit' className='focus:border-0 border-1 text-3xl'><IoSend /></button>
            </form>
        </div>
    );
};

const CreateMsg = ({ msges }) => {
    console.log("HK msg is: :", msges)
    return (
        <div className='flex flex-col gap-4 h-full'>
            {
                msges.map((msg) => {
                    if (msg.type == "question")
                        return (
                            <div id={(msges[msges.length - 1]?.details == msg.details) ? 'id' : 'k'} className='w-full flex justify-end gap-3'>
                                <div className='rounded-lg text-white flex justify-end  text-justify bg-blue-500 text-balance max-w-lg    p-2'>
                                    {msg.details}
                                </div>
                                <img className='h-10 w-10 rounded-full' src='https://i.imgur.com/asLPUCK.jpg' />
                            </div>
                        )
                    else if (msg.type == "answer")
                        return (
                            <div id={(msges[msges.length - 1]?.details == msg.details) ? 'id' : 'k'} className='w-full flex justify-start'>
                                <img className='h-10 w-10 rounded-full' src='./../../assets/logo.png' alt='no img' />

                                <div className='rounded-lg text-white flex justify-start  text-justify text-balance p-2 bg-blue-500 max-w-lg'>
                                    {msg.details}
                                </div>
                            </div>
                        )
                    else
                        return (
                            <div>
                                <img className='h-10 w-10 rounded-full' src='./../../assets/logo.png' alt='no img' />

                                <span className="loading loading-dots loading-lg"></span>
                            </div>
                        )
                })
            }
        </div>
    )
}


export default PDFChat;