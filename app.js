<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>ระบบบันทึกเชื้อสายเครือญาติ</title>
    
    <!-- ตั้งค่าไอคอนสำหรับเว็บและมือถือ -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌳</text></svg>">
    <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23ffffff%22/><text y=%22.8em%22 font-size=%2280%22 x=%2210%22>🌳</text></svg>">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="สมุดตระกูล">

    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Prompt', sans-serif; background-color: #f3f4f6; }
        
        .tree-container { overflow-x: auto; padding-bottom: 40px; cursor: grab; }
        .tree-container:active { cursor: grabbing; }
        .tree { display: flex; justify-content: center; min-width: max-content; padding: 20px; }
        .tree ul { padding-top: 20px; position: relative; display: flex; justify-content: center; padding-left: 0; transition: all 0.3s; }
        .tree li { text-align: center; list-style-type: none; position: relative; padding: 20px 10px 0 10px; transition: all 0.3s; }
        
        .tree li::before, .tree li::after {
            content: ''; position: absolute; top: 0; right: 50%;
            border-top: 2px solid #10b981; width: 50%; height: 20px;
        }
        .tree li::after { right: auto; left: 50%; border-left: 2px solid #10b981; }
        
        .tree li:only-child::after, .tree li:only-child::before { display: none; }
        .tree li:only-child { padding-top: 0; }
        
        .tree li:first-child::before, .tree li:last-child::after { border: 0 none; }
        .tree li:last-child::before { border-right: 2px solid #10b981; border-radius: 0 5px 0 0; }
        .tree li:first-child::after { border-radius: 5px 0 0 0; }
        
        .tree ul ul::before {
            content: ''; position: absolute; top: 0; left: 50%;
            border-left: 2px solid #10b981; width: 0; height: 20px;
        }
        
        .tree-node-card {
            border: 1px solid #e5e7eb; padding: 15px 10px;
            background-color: white; border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            min-width: 140px; max-width: 160px; 
            display: inline-block; position: relative; z-index: 10;
        }
    </style>
</head>
<body class="p-4 md:p-6">
    <div class="max-w-4xl mx-auto space-y-6">
        <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-800">🌳 ระบบบันทึกเชื้อสายเครือญาติ</h1>
            <p class="text-gray-500 mt-2">สมุดพกตระกูลดิจิทัล - ค้นหาและบันทึกข้อมูลสมาชิก</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md">
            <h2 class="text-xl font-semibold mb-4 text-green-700" id="formTitle">เพิ่มสมาชิกใหม่</h2>
            <form id="memberForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label class="block text-sm text-gray-600 mb-1">ชื่อ-นามสกุล</label><input type="text" id="name" required class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500"></div>
                <div><label class="block text-sm text-gray-600 mb-1">ความสัมพันธ์</label><input type="text" id="relation" placeholder="เช่น ปู่, พ่อ, ภรรยา" required class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500"></div>
                <div><label class="block text-sm text-gray-600 mb-1">เบอร์โทรศัพท์</label><input type="tel" id="phone" class="w-full border border-gray-300 rounded-lg p-2"></div>
                <div><label class="block text-sm text-gray-600 mb-1">จังหวัดที่อยู่ปัจจุบัน</label><input type="text" id="location" class="w-full border border-gray-300 rounded-lg p-2"></div>
                <div class="md:col-span-2"><label class="block text-sm text-gray-600 mb-1">ลิงก์รูปภาพโปรไฟล์ (URL)</label><input type="url" id="imageUrl" class="w-full border border-gray-300 rounded-lg p-2"></div>
                
                <div class="md:col-span-1">
                    <label class="block text-sm text-gray-600 mb-1">เชื่อมโยงกับ (ระบุบุคคลอ้างอิง)</label>
                    <select id="linkedId" class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500"><option value="">-- เป็นจุดเริ่มต้นสายตระกูล (Root) --</option></select>
                </div>
                <div class="md:col-span-1">
                    <label class="block text-sm text-gray-600 mb-1">สถานะต่อบุคคลอ้างอิง</label>
                    <select id="linkType" class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500">
                        <option value="child">เป็น "บุตร" (ต่อสายลงด้านล่าง)</option>
                        <option value="spouse">เป็น "คู่สมรส" (วางเคียงข้างกัน)</option>
                    </select>
                </div>

                <div class="md:col-span-2 text-right mt-2 flex justify-end">
                    <button type="button" id="cancelBtn" onclick="cancelEdit()" class="hidden bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-500 mr-2">ยกเลิก</button>
                    <button type="submit" id="submitBtn" class="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700">+ บันทึกข้อมูล</button>
                </div>
            </form>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md overflow-hidden">
            <h2 class="text-xl font-semibold mb-4 text-green-700">แผนผังเครือญาติ</h2>
            <div id="treeContainer" class="tree-container mt-4 bg-gray-50 rounded-lg"></div>
        </div>
    </div>

    <script>
        let familyMembers = JSON.parse(localStorage.getItem('familyData')) || [];
        
        familyMembers = familyMembers.map(m => {
            if (m.parentId !== undefined) {
                m.linkedId = m.parentId;
                m.linkType = 'child';
                delete m.parentId;
            }
            return m;
        });

        let editingId = null;

        const form = document.getElementById('memberForm');
        const linkedSelect = document.getElementById('linkedId');
        const linkTypeSelect = document.getElementById('linkType');
        const treeContainer = document.getElementById('treeContainer');
        const submitBtn = document.getElementById('submitBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const formTitle = document.getElementById('formTitle');

        updateSelectDropdown();
        renderTree();

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const memberData = {
                name: document.getElementById('name').value,
                relation: document.getElementById('relation').value,
                phone: document.getElementById('phone').value,
                location: document.getElementById('location').value,
                imageUrl: document.getElementById('imageUrl').value,
                linkedId: document.getElementById('linkedId').value || null,
                linkType: document.getElementById('linkedId').value ? document.getElementById('linkType').value : 'root'
            };

            if (editingId) {
                const index = familyMembers.findIndex(m => m.id === editingId);
                if(index !== -1) familyMembers[index] = { ...familyMembers[index], ...memberData };
                cancelEdit();
            } else {
                memberData.id = Date.now().toString();
                familyMembers.push(memberData);
                form.reset();
            }

            saveData();
            updateSelectDropdown();
            renderTree();
        });

        window.editMember = function(id) {
            const member = familyMembers.find(m => m.id === id);
            if(!member) return;

            document.getElementById('name').value = member.name;
            document.getElementById('relation').value = member.relation;
            document.getElementById('phone').value = member.phone || '';
            document.getElementById('location').value = member.location || '';
            document.getElementById('imageUrl').value = member.imageUrl || '';
            document.getElementById('linkedId').value = member.linkedId || '';
            document.getElementById('linkType').value = member.linkType === 'spouse' ? 'spouse' : 'child';

            editingId = id;
            formTitle.innerText = '✏️ แก้ไขข้อมูลสมาชิก';
            formTitle.classList.replace('text-green-700', 'text-blue-700');
            submitBtn.innerText = '💾 บันทึกการแก้ไข';
            submitBtn.classList.replace('bg-green-600', 'bg-blue-600');
            cancelBtn.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        window.cancelEdit = function() {
            editingId = null;
            form.reset();
            formTitle.innerText = 'เพิ่มสมาชิกใหม่';
            formTitle.classList.replace('text-blue-700', 'text-green-700');
            submitBtn.innerText = '+ บันทึกข้อมูล';
            submitBtn.classList.replace('bg-blue-600', 'bg-green-600');
            cancelBtn.classList.add('hidden');
        };

        function saveData() { localStorage.setItem('familyData', JSON.stringify(familyMembers)); }

        function updateSelectDropdown() {
            linkedSelect.innerHTML = '<option value="">-- เป็นจุดเริ่มต้นสายตระกูล (Root) --</option>';
            familyMembers.forEach(member => {
                const option = document.createElement('option');
                option.value = member.id;
                option.textContent = member.name;
                linkedSelect.appendChild(option);
            });
        }

        function createCardHTML(person) {
            const imageDisplay = person.imageUrl 
                ? `<img src="${person.imageUrl}" alt="${person.name}" class="w-14 h-14 rounded-full object-cover border-4 border-green-100 mx-auto mb-2 shadow-sm">`
                : `<div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border-4 border-white shadow-sm text-xl mx-auto mb-2">${person.name.charAt(0)}</div>`;

            return `
                <div class="tree-node-card">
                    ${imageDisplay}
                    <div class="font-bold text-gray-800 text-sm break-words">${person.name}</div>
                    <div class="text-xs text-white ${person.linkType === 'spouse' ? 'bg-pink-500' : 'bg-green-500'} rounded-full px-2 py-1 mt-1 inline-block">${person.relation}</div>
                    ${person.location ? `<div class="text-xs text-gray-500 mt-2">📍 ${person.location}</div>` : ''}
                    ${person.phone ? `<div class="text-xs text-gray-500 mt-1">📞 ${person.phone}</div>` : ''}
                    <div class="mt-3 flex justify-center space-x-3">
                        <button onclick="editMember('${person.id}')" class="text-blue-500 text-xs hover:text-blue-700 underline">แก้ไข</button>
                        <button onclick="deleteMember('${person.id}')" class="text-red-400 text-xs hover:text-red-600 underline">ลบ</button>
                    </div>
                </div>
            `;
        }

        function renderTree() {
            if (familyMembers.length === 0) {
                treeContainer.innerHTML = '<p class="text-gray-400 text-sm italic text-center py-6">ยังไม่มีข้อมูล โปรดเพิ่มสมาชิกด้านบน</p>';
                return;
            }
            treeContainer.innerHTML = '';
            
            const rootMembers = familyMembers.filter(m => !m.linkedId);
            
            const treeDiv = document.createElement('div');
            treeDiv.className = 'tree';
            const rootUl = document.createElement('ul');
            
            rootMembers.forEach(root => {
                rootUl.appendChild(buildNodeHTML(root));
            });
            
            treeDiv.appendChild(rootUl);
            treeContainer.appendChild(treeDiv);
        }

        function buildNodeHTML(member) {
            const li = document.createElement('li');
            
            const spouses = familyMembers.filter(m => m.linkedId === member.id && m.linkType === 'spouse');
            const groupDiv = document.createElement('div');
            groupDiv.className = 'flex items-center justify-center relative z-10';
            
            groupDiv.innerHTML = createCardHTML(member);
            
            spouses.forEach(spouse => {
                groupDiv.innerHTML += `
                    <div class="flex items-center px-2">
                        <div class="h-0.5 w-6 bg-pink-400"></div>
                        <span class="text-pink-500 text-sm mx-1">❤️</span>
                        <div class="h-0.5 w-6 bg-pink-400"></div>
                    </div>
                `;
                groupDiv.innerHTML += createCardHTML(spouse);
            });
            
            li.appendChild(groupDiv);

            const children = familyMembers.filter(m => m.linkedId === member.id && m.linkType === 'child');
            if (children.length > 0) {
                const ul = document.createElement('ul');
                children.forEach(child => {
                    ul.appendChild(buildNodeHTML(child));
                });

                const toggleContainer = document.createElement('div');
                toggleContainer.className = 'mt-3 mb-[-10px] relative z-20';
                const toggleBtn = document.createElement('button');
                toggleBtn.innerHTML = '🔽 ยุบสายย่อย';
                toggleBtn.className = 'text-xs bg-gray-100 border border-gray-300 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-200 focus:outline-none transition-colors';
                
                toggleBtn.onclick = function() {
                    if (ul.style.display === 'none') {
                        ul.style.display = 'flex';
                        toggleBtn.innerHTML = '🔽 ยุบสายย่อย';
                        toggleBtn.classList.replace('bg-green-100', 'bg-gray-100');
                        toggleBtn.classList.replace('text-green-700', 'text-gray-600');
                        toggleBtn.classList.replace('border-green-300', 'border-gray-300');
                    } else {
                        ul.style.display = 'none';
                        toggleBtn.innerHTML = `▶️ ดูสายย่อย (${children.length})`;
                        toggleBtn.classList.replace('bg-gray-100', 'bg-green-100');
                        toggleBtn.classList.replace('text-gray-600', 'text-green-700');
                        toggleBtn.classList.replace('border-gray-300', 'border-green-300');
                    }
                };
                
                toggleContainer.appendChild(toggleBtn);
                li.appendChild(toggleContainer);
                li.appendChild(ul);
            }
            return li;
        }

        let isDown = false;
        let startX;
        let scrollLeft;

        treeContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - treeContainer.offsetLeft;
            scrollLeft = treeContainer.scrollLeft;
        });
        treeContainer.addEventListener('mouseleave', () => { isDown = false; });
        treeContainer.addEventListener('mouseup', () => { isDown = false; });
        treeContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - treeContainer.offsetLeft;
            const walk = (x - startX) * 2; 
            treeContainer.scrollLeft = scrollLeft - walk;
        });
    </script>
</body>
</html>
