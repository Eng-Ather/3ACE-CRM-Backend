
export default function sendResponse(res, status, data, error, msg) {
    res.status(status).json({
      error,
      msg,
      data: data,
    });
  }
  

// export default function 
// sendResponse(res, status = 200, data = null, error = false, msg = "")
//  {
//     return res.status(status).json({
//       success: !error, // Adding success flag (optional)
//       message: msg,
//       error: error || null,
//       data: data || null,
//     });
//   }
  