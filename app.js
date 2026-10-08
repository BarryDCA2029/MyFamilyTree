<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ระบบบันทึกเชื้อสายเครือญาติ</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Prompt', sans-serif; background-color: #f3f4f6; }
        
        /* CSS สำหรับวาดแผนผังต้นไม้กางออก */
        .tree-container { overflow-x: auto; padding-bottom: 20px; }
        .tree { display: flex; justify-content: center; min-width: max-content; }
        .tree ul { padding-top: 20px; position: relative; display: flex; justify-content: center; padding-left: 0; }
        .tree li { text-align: center; list-style-type: none; position: relative; padding: 20px 10px 0 10px; }
        
        /* เส้นเชื่อมต่อแนวนอน */
        .tree li::before, .tree li::after {
            content: ''; position: absolute; top: 0; right: 50%;
            border-top: 2px solid #10b981; width: 50%; height: 20px;
        }
        /* เส้นเชื่อมต่อแนวตั้ง */
        .tree li::after { right: auto; left: 50%; border-left: 2px solid #10b981; }
        
        /* ซ่อนเส้นกรณีไม่มีพี่น้อง */
        .tree li:only-child::after, .tree li:only-child::before { display: none; }
        .tree li:only-child { padding-top: 0; }
        
        /* เก็บมุมเส้นซ้าย-ขวา */
        .tree li:first-child::before, .tree li:last-child::after { border: 0 none; }
        .tree li:last-child::before { border-right: 2px solid #10b981; border-radius: 0 5px 0 0; }
        .tree li:first-child::after { border-radius: 5px 0 0 0; }
        
        /* เส้นลากจากกล่องแม่ไปหาลูก */
        .tree ul ul::before {
            content: ''; position: absolute; top: 0; left: 50%;
            border-left: 2px solid #10b981; width: 0; height: 20px;
        }
        
        /* ตกแต่งกล่องโปรไฟล์ */
        .tree-node-card {
            border: 1px solid #e5e7eb; padding: 15px 10px;
            background-color: white; border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            min-width: 140px; max-width: 160px; display: inline-block;
        }
    </style>
</head>
<body class="p-6">
    <div class="max-w-4xl mx-auto space-y-6">
        <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-800">🌳 ระบบบันทึกเชื้อสายเครือญาติ</h1>
            <p class="text-gray-500 mt-2">สมุดพกตระกูลดิจิทัล - ค้นหาและบันทึกข้อมูลสมาชิก</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md">
            <h2 class="text-xl font-semibold mb-4 text-green-700">เพิ่มสมาชิกใหม่</h2>
            <form id="memberForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label class="block text-sm text-gray-600 mb-1">ชื่อ-นามสกุล</label><input type="text" id="name" required class="w-full border border-gray-300 rounded-lg p-2"></div>
                <div><label class="block text-sm text-gray-600 mb-1">ความสัมพันธ์</label><input type="text" id="relation" placeholder="เช่น ปู่, พ่อ" required class="w-full border border-gray-300 rounded-lg p-2"></div>
                <div><label class="block text-sm text-gray-600 mb-1">เบอร์โทรศัพท์</label><input type="tel" id="phone" class="w-full border border-gray-300 rounded-lg p-2"></div>
                <div><label class="block text-sm text-gray-600 mb-1">จังหวัดที่อยู่ปัจจุบัน</label><input type="text" id="location" class="w-full border border-gray-300 rounded-lg p-2"></div>
                <div class="md:col-span-2"><label class="block text-sm text-gray-600 mb-1">ลิงก์รูปภาพโปรไฟล์ (URL)</label><input type="url" id="imageUrl" class="w-full border border-gray-300 rounded-lg p-2"></div>
                <div class="md:col-span-2">
                    <label class="block text-sm text-gray-600 mb-1">เชื่อมโยงกับ (ระบุชื่อพ่อ/แม่)</label>
                    <select id="parentId" class="w-full border border-gray-300 rounded-lg p-2"><option value="">-- เป็นจุดเริ่มต้นสายตระกูล (Root) --</option></select>
                </div>
                <div class="md:col-span-2 text-right mt-2"><button type="submit" class="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700">+ บันทึกข้อมูล</button></div>
            </form>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md overflow-hidden">
            <h2 class="text-xl font-semibold mb-4 text-green-700">แผนผังเครือญาติ</h2>
            <div id="treeContainer" class="tree-container mt-4 bg-gray-50 rounded-lg"></div>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>
