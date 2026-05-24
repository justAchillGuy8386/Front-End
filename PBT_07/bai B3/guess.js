(function playGuessNumber() {
    const secret = Math.floor(Math.random() * 100) + 1;
    const maxAttempts = 7;
    const guessedNumbers = [];
    let attempts = 0;

    alert("🎮 Đoán số từ 1 đến 100! Bạn có tối đa 7 lượt.");

    while (attempts < maxAttempts) {
        const input = prompt(
            `Lượt ${attempts + 1}/${maxAttempts}\nNhập số từ 1 đến 100:`
        );

        if (input === null) {
            alert("Bạn đã thoát game.");
            return;
        }

        const guess = Number(input);

        if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
            alert("⚠️ Chỉ chấp nhận số nguyên từ 1 đến 100!");
            continue;
        }

        if (guessedNumbers.includes(guess)) {
            alert("⚠️ Bạn đã đoán số này rồi!");
            continue;
        }

        guessedNumbers.push(guess);
        attempts++;

        if (guess === secret) {
            alert(`🎉 Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
            return;
        }

        if (guess < secret) {
            alert("📈 Cao hơn!");
        } else {
            alert("📉 Thấp hơn!");
        }
    }

    alert(`😢 Hết lượt! Đáp án đúng là: ${secret}`);
})();
