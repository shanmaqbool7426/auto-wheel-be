
export const otpTemplete = (otp) => {
    return `
    <html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Kyoo Pay | OTP</title>
	<meta name="description" content="">
	<link rel="icon" href="https://kyoopay-bucket.s3.amazonaws.com/imagess/fav-icon.svg" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
</head>
<body style="box-sizing: border-box; margin: 0; font-family: 'Lato' !important;">
	<div style="box-sizing: border-box; background-color: #EDEDEE; max-width: 600px; border-radius: 24px; width: 100%; margin: 30px auto; padding: 16px;">
		<div style="width: 100%; padding: 40px 55px; margin-left:13px; margin-bottom: 16px; background-color: #FFFFFF; border-radius: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box;">
			<div style="width: 100%; text-align: left;">
				<img src="https://kyoopay-bucket.s3.amazonaws.com/imagess/otp.png" width="214" height="158" alt="app store icon" style="display: block; padding-bottom: 2rem;" />
				<h1 style="box-sizing: border-box; margin: 0; font-size: 28px; line-height: 1.3; font-weight: 900; color: #2E2E2E;text-align:left; padding-bottom: 0.50rem;">Verifica OTP</h1>
				<p style="box-sizing: border-box;margin: 0; font-size: 14px; font-weight: 400; line-height: 21px; color: #636365; padding-bottom: 1.25rem;">Thank you for registering with AutoWheels. To complete the email verification process, please use the following One-Time Password (OTP).</p>
				<h2 style="box-sizing: border-box; margin: 0; font-size: 36px; line-height: 1.3; font-weight: 700; color: #2E2E2E;text-align:left; padding-bottom: 1.25rem;">${otp}</h2>
				<p style="box-sizing: border-box;margin: 0; font-size: 14px; font-weight: 400; line-height: 21px; color: #636365;">Enter this code on the verification page. This OTP is valid for 5 minutes.</p>
			</div>
		</div>
		<div style="box-sizing: border-box; width: 100%; text-align: center;">
			<div style="box-sizing: border-box; max-width: 465px; margin: 0 auto; padding: 25px;">
				<div style="box-sizing: border-box; margin: 0 0 20px; font-size: 12px; line-height: 14.4px; font-weight: 500; color: #1F1F22;">
					<a href="https://kyoodata.s3.eu-south-1.amazonaws.com/Privacy-Policy.pdf" style="box-sizing: border-box; display: inline-block; font-weight: 700; text-decoration: none; color: #1F1F22;">
						Privacy Policy  
					</a>  
					<span style="padding: 0 10px;"> | </span> 
					<a href="https://kyoodata.s3.eu-south-1.amazonaws.com/Condizioni-Fornitori-Terzi.pdf" style="box-sizing: border-box; display: inline-block; font-weight: 700; text-decoration: none; color: #1F1F22;"> Termini e Condizioni  </a> 
					<span style="padding: 0 10px;"> | </span> 
					<a href="https://kyoodata.s3.eu-south-1.amazonaws.com/Registro-Trattamenti-Dati.pdf" style="box-sizing: border-box; display: inline-block; font-weight: 700; text-decoration: none; color: #1F1F22;">  
						 
					</a> 
				</div>
				<div style="box-sizing: border-box; margin: 0 0 20px; font-size: 12px; line-height: 14.4px; font-weight: 500; color: #1F1F22;">
		
					<span style="padding: 0 10px;"> | </span> 
					// <a href="https://kyoopay.it" style="box-sizing: border-box; display: inline-block; font-weight: 700; text-decoration: none; color: #1F1F22;"> 
					// 	About Us  
					// </a>  
				</div>
				<p style="box-sizing: border-box; color: #9A9A9B; line-height: 21px; font-size: 12px; font-weight: 400; text-align: center; margin: 0 0 25px;">Save Time and Respect the Environment with Auto Wheels!</p>
				<div style="box-sizing: border-box; margin-bottom: 25px; display: block;">
					<a href="#" style="box-sizing: border-box; width: 120px; height: 34px; display:inline-block; text-decoration:none; vertical-align: middle;">
						// <img src="https://kyoopay-bucket.s3.amazonaws.com/imagess/AppStoreBtn.png" width="108" height="38" alt="play store icon" />
					</a>
					<a href="#" style="box-sizing: border-box; width: 120px; height: 34px; display:inline-block; text-decoration:none; vertical-align: middle; margin-left: 6px;">
						// <img src="https://kyoopay-bucket.s3.amazonaws.com/imagess/PlayStoreBtn.png" width="108" height="38" alt="app store icon" />
					</a>
				</div>
				<p style="box-sizing: border-box; margin: 0; font-size: 12px; text-align: center; line-height: 1.5; color:#9A9A9B; font-weight: 500;">&copy; 2024 Kyoopay. All rights reserved.</p>
			</div>
		</div>
	</div>
</body>
</html>
        `;
}

