        var timestamp = 1396796334;//new Date().getTime();
        var noney = "677df00e0a565f4bf7fa04c6805b77a6";
		var ntwic = "677df00e0a565f4bf7fe04c6805b77a6";
		var raw =  timestamp + "\n" + noney + "\n";
		var raw2 = timestamp + "\n" + ntwic + "\n";
		var raw3 = "1396796334\n677df00e0a565f4bf7fe04c6805b77a6\n"
		
		console.log(raw == raw2);
		console.log(raw2 == raw3);