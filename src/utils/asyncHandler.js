const asyncHandler = (requestHandler) => {
    (req,res,next) =>{
        Promise.reslove(requestHandler(req,res,next)).
        catch((err)=>next(err0))
    }
}

export {asyncHandler};

// const asyncHandler=(fn)=> async(req,ers,next)=>{
//     try{
//         await fn(req,res,next);
//     }catch(error){
//         res.status(err.code ||500).json({
//             success : false,
//             message : err.message,
//         })
//         console.log("ERROR :",error);
//     }
// } 