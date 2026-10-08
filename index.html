let familyMembers = JSON.parse(localStorage.getItem('familyData')) || [];
const form = document.getElementById('memberForm');
const parentSelect = document.getElementById('parentId');
const treeContainer = document.getElementById('treeContainer');

updateSelectDropdown();
renderTree();

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const newMember = {
        id: Date.now().toString(),
        name: document.getElementById('name').value,
        relation: document.getElementById('relation').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        imageUrl: document.getElementById('imageUrl').value,
        parentId: document.getElementById('parentId').value || null
    };
    familyMembers.push(newMember);
    saveData();
    form.reset();
    updateSelectDropdown();
    renderTree();
});

function saveData() { localStorage.setItem('familyData', JSON.stringify(familyMembers)); }

function updateSelectDropdown() {
    parentSelect.innerHTML = '<option value="">-- เป็นจุดเริ่มต้นสายตระกูล (Root) --</option>';
    familyMembers.forEach(member => {
        const option = document.createElement('option');
        option.value = member.id;
        option.textContent = member.name;
        parentSelect.appendChild(option);
    });
}

function renderTree() {
    if (familyMembers.length === 0) {
        treeContainer.innerHTML = '<p class="text-gray-400 text-sm italic text-center py-6">ยังไม่มีข้อมูล โปรดเพิ่มสมาชิกด้านบน</p>';
        return;
    }
    treeContainer.innerHTML = '';
    
    const rootMembers = familyMembers.filter(m => !m.parentId);
    
    // สร้างโครงสร้างต้นไม้
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
    
    // ตรวจสอบรูปภาพ
    const imageDisplay = member.imageUrl 
        ? `<img src="${member.imageUrl}" alt="${member.name}" class="w-14 h-14 rounded-full object-cover border-4 border-green-100 mx-auto mb-2 shadow-sm">`
        : `<div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border-4 border-white shadow-sm text-xl mx-auto mb-2">${member.name.charAt(0)}</div>`;

    // สร้างกล่อง
    const card = document.createElement('div');
    card.className = 'tree-node-card';
    card.innerHTML = `
        ${imageDisplay}
        <div class="font-bold text-gray-800 text-sm break-words">${member.name}</div>
        <div class="text-xs text-white bg-green-500 rounded-full px-2 py-1 mt-1 inline-block">${member.relation}</div>
        ${member.location ? `<div class="text-xs text-gray-500 mt-2">📍 ${member.location}</div>` : ''}
        ${member.phone ? `<div class="text-xs text-gray-500 mt-1">📞 ${member.phone}</div>` : ''}
        <button onclick="deleteMember('${member.id}')" class="text-red-400 text-xs mt-3 hover:text-red-600 underline block mx-auto">ลบ</button>
    `;
    li.appendChild(card);

    // หาลูกๆ ที่สืบเชื้อสายต่อ
    const children = familyMembers.filter(m => m.parentId === member.id);
    if (children.length > 0) {
        const ul = document.createElement('ul');
        children.forEach(child => {
            ul.appendChild(buildNodeHTML(child));
        });
        li.appendChild(ul);
    }
    return li;
}

window.deleteMember = function(id) {
    if(confirm('ต้องการลบข้อมูลนี้ใช่หรือไม่? ข้อมูลสายย่อยที่เชื่อมโยงอยู่จะถูกตั้งเป็นจุดเริ่มต้นใหม่')) {
        familyMembers.forEach(m => { if (m.parentId === id) m.parentId = null; });
        familyMembers = familyMembers.filter(m => m.id !== id);
        saveData();
        updateSelectDropdown();
        renderTree();
    }
}
