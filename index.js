//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


const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const configuration = new Configuration({
    organization: "org-NeinL0L5UaisHKMlkDgqB6oJ",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express()

const port = 3080
app.use(bodyParser.json())
app.use(cors())
app.post('/',async(req,res) => {
    const {message,currentModel} = req.body;
    
     const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 3000,
        temperature: 0.5,
      });
    //   console.log(response.data.choices[0].text)

    res.json({
        message:response.data.choices[0].text
    })
});

app.get('/models',async(req,res)=>{
    const response = await openai.listEngines();
    console.log(response)
    res.json({
        models:response.data
    })
})

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
});