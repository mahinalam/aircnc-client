
// export const imageUpload = async image => {
//     const formData = new FormData()
//     formData.append('image', image)
//     const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY
//         }`
//     const data = await fetch(url, {
//         method: 'POST',
//         body: formData,
//     })
//     const res =  data.json()
//     console.log(res)
//     return res;
// }

export const imageUpload = async image => {
    const formData = new FormData()
    formData.append('image', image)

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, {
        method: 'POST',
        body: formData
    })

    const data = await res.json()
    console.log(data)
    return data

}
