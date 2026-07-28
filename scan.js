// -----------------------------
// 出席データ送信（GitHub）
// -----------------------------
async function sendAttendance(studentId) {

    const payload = {
        event_type: "attendance",
        client_payload: {
            student_id: studentId,
            timestamp: new Date().toISOString()
        }
    };

    try {
        const response = await fetch(
            "https://api.github.com/repos/ryujit1020/attendance/dispatches",
            {
                method: "POST",
                headers: {
                    "Accept": "application/vnd.github+json",
                    "Authorization": "Bearer YOUR_GITHUB_TOKEN"
                },
                body: JSON.stringify(payload)
            }
        );

        if (response.ok) {
            document.getElementById("status").textContent =
                `送信成功（GitHub）: ${studentId}`;
        } else {
            document.getElementById("status").textContent =
                `GitHub送信失敗: ${response.status}`;
        }

    } catch (error) {
        document.getElementById("status").textContent =
            "GitHub送信エラー: " + error;
    }
}
