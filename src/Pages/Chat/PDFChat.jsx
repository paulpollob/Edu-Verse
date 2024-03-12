import React, { useContext, useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { Context } from '../../Context/EduContext';
import botlogo from '../../assets/images/gchat.png'

const PDFChat = () => {
    const { tcLeftRoute, setTcLeftRoute } = useContext(Context);
    setTcLeftRoute(2);

    const [txt, setText] = useState("");
    const [flg, setFlg] = useState(0);
    const [msges, setMsges] = useState([])
    const [upload, setUpload] = useState(true);
    const [uplding, setUplding] = useState(false);
    const [connected, setConnected] = useState(false);

    const pdfUpload = (event) => {
        event.preventDefault();
        setUpload(!upload);
        setUplding(true);
        setMsges([])
        const input = event.target.input
        let file = input.files[0];
        if (file != undefined && file.type == "application/pdf") {
            // let fr = new FileReader(); // Create a new FileReader object
            // fr.readAsDataURL(file); // Read the file as data URL
            // fr.onload = () => {
            //     let res = fr.result; // Get the result of file reading
            //     extractText(res, false, event); // Extract text without password 

            // }
            // alert("HK")
            afterProcess(file)
        } else {
            alert("Select a valid PDF file");
            setUplding(false);
        }
    }
    const editPdf = (event) => {
        event.preventDefault();
        setUpload(!upload);
        setConnected(false);
    }

    // let alltext = [];

    // async function extractText(url, pass, event) {
    //     try {
    //         const pdf = await pdfjsLib.getDocument(url).promise; // Get the PDF document without password
    //         let pages = pdf.numPages;
    //         for (let i = 1; i <= pages; i++) {
    //             let page = await pdf.getPage(i); // Get the page object for each page
    //             let txt = await page.getTextContent(); // Get the text content of the page
    //             let text = txt.items.map((s) => s.str).join(""); // Concatenate the text items into a single string
    //             alltext.push(text); // Add the extracted text to the array
    //         }

    //         afterProcess(event);
    //     }
    //     catch (err) {
    //         alert(err.message);
    //     }
    // }

    const afterProcess = async (file) => {
        // const answer = event.target.parentNode.children[1]

        // let txt = "";

        // alltext.map((e, i) => {
        //     txt += alltext[i] + ` `; // Add options for each page in the page selection dropdown
        // });
        // setText(txt);
        // setFlg(flg + 1);
        const url = 'https://pdf-to-text-converter.p.rapidapi.com/api/pdf-to-text/convert';
        const data = new FormData();
        data.append('file', file);
        data.append('page', '1');
        const options = {
            method: 'POST',
            headers: {
                'X-RapidAPI-Key': '4316d255c0msh10b17f4968dbd30p1fc510jsn3ec5d0970a67',
                'X-RapidAPI-Host': 'pdf-to-text-converter.p.rapidapi.com'
            },
            body: data
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text(); 
            setText(result)

            setFlg(flg + 1);
            console.log("HK: result: ", txt);
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        const load = () => {
            fetch('http://localhost:8000/pdfTextLoaded', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "usertext": txt })
            })
                .then(res => res.json())
                .then((data) => {
                    if (data.error) {
                        alert("Server Error:", data.error);
                        setUplding(false);
                        return;
                    }
                    setConnected(data.success);
                    setUplding(false);
                })
                .catch((error) => { alert("Server Error:", error); setUplding(false); });
        }
        if (flg != 0) load();

    }, [txt])

    return (
        <div className='relative h-full'>
            <div className=''>
                <form className='w-full flex ' onSubmit={upload ? pdfUpload : editPdf}>
                    <input name='input' type='file' accept="application/pdf, application/vnd.ms-excel" placeholder='upload pdf' className='border-none rounded-s-lg bg-blue-50 text-slate-900' disabled={upload ? false : true} />
                    <button type='submit' className='border rounded-none rounded-e-lg bg-blue-50 text-slate-900 px-5 '>{upload ? "Upload PDF" : "Upload Another"}</button>
                </form>


                <div className='w-full border my-3'></div>

                <div className='relative'>
                    <div className=''><Chat msges={msges} setMsges={setMsges}></Chat></div>
                    {!connected && <div className='absolute top-0 rounded-lg w-full h-full bg-slate-50 opacity-80'></div>}
                </div>
            </div>
            {
                uplding &&
                <div className='absolute w-full h-full bg-slate-50 opacity-70 top-0 flex justify-center items-center'>
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            }

        </div>
    );
};




const Chat = ({ msges, setMsges }) => {



    const [flg, setFlg] = useState(0);
    const [loading, setLoading] = useState(false)
    const send = (event) => {
        event.preventDefault();
        setLoading(true)
        const msg = event.target.msg;
        setMsges([...msges, { "type": "question", "details": msg.value }])
        msg.value = ""
        setFlg(flg + 1);
    }
    useEffect(() => {

        const msg = () => {
            fetch('http://localhost:8000/chatPDFgemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'user': msges[msges.length - 1]?.details })
            })
                .then(res => res.json())
                .then((data) => {
                    if (data.error) {
                        alert("Server Error:", data.error);
                        setLoading(false);
                        return;
                    }
                    setMsges([...msges, { 'type': 'answer', 'details': data.output_text }]); setLoading(false)
                })
                .catch((error) => { alert("Server Error:", error); setLoading(false); });
        }

        if (flg != 0) msg();
    }, [flg]);



    return (
        <div className='flex flex-col items-center justify-end border h-96 rounded-lg'>
            <div id='chat' className=' flex flex-col w-full h-full overflow-auto scroll-m-6 p-6 '>

                <CreateMsg msges={msges} loading={loading}></CreateMsg>

            </div>
            <form onSubmit={send} className=' p-5 flex justify-between items-center gap-3 w-full'>
                <img className='rounded-full h-10 w-10' src={botlogo}></img>
                <input name='msg' type='text' placeholder='Write Your Message...' className='border rounded-lg w-full' />
                <button type='submit' className='focus:border-0 border-1 text-3xl'><IoSend /></button>
            </form>
        </div>
    );
};

const CreateMsg = ({ msges, loading }) => {
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
                                <img className='h-10 w-10 rounded-full' src='https://i.ibb.co/KzC49TW/good-Education.png' />
                            </div>
                        )
                    else if (msg.type == "answer")
                        return (
                            <div id={(msges[msges.length - 1]?.details == msg.details) ? 'id' : 'k'} className='w-full flex justify-start'>
                                <img className='h-10 w-10 rounded-full' src={botlogo} alt='no img' />

                                <div className='rounded-lg text-white flex justify-start  text-justify text-balance p-2 bg-blue-500 max-w-lg'>
                                    {msg.details}
                                </div>
                            </div>
                        )
                    else
                        return (
                            <div>
                                <img className='h-10 w-10 rounded-full' src={botlogo} alt='no img' />

                                <span className="loading loading-dots loading-lg"></span>
                            </div>
                        )
                })
            }
            {
                loading && <div className='w-full flex justify-start py-5 gap-3'>
                    <img className='h-10 w-10 rounded-full' src={botlogo} alt='no img' />

                    <span className="loading loading-dots loading-md"></span>
                </div>
            }
        </div>
    )
}


export default PDFChat;