// -----------------------------
// BLE スキャン開始
// -----------------------------
document.getElementById("scanButton").addEventListener("click", async () => {
    document.getElementById("status").textContent = "スキャン中…";

    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ namePrefix: "HU-" }],
            optionalServices: ["battery_service"]
        });

        document.getElementById("status").textContent =
            `デバイス検出: ${device.name}`;

        // ここではデバイス名から studentId を抽出する例
        // 例: "HU-12345" → 12345
        const studentId = device.name.replace("HU-", "");

        // Moodle に送信
        sendAttendance(studentId);

    } catch (error) {
        document.getElementById("status").textContent =
            "エラー: " + error;
    }
});


// -----------------------------
// 出席データ送信（Moodle）
// -----------------------------
async function sendAttendance(studentId) {
    const url = "https://YOUR_MOODLE_URL/attendance/submit.php";

    const payload = {
        student_id: studentId,
        timestamp: Date.now()
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            document.getElementById("status").textContent =
                `送信成功: ${studentId}`;
        } else {
            document.getElementById("status").textContent =
                `送信失敗: ${response.status}`;
        }

    } catch (error) {
        document.getElementById("status").textContent =
            "送信エラー: " + error;
    }
}
