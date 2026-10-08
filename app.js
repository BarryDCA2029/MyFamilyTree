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
        treeContainer.innerHTML = '<p class="text-gray-400 text-sm italic">ยังไม่มีข้อมูล โปรดเพิ่มสมาชิกด้านบน</p>';
        return;
    }
    treeContainer.innerHTML = '';
    const rootMembers = familyMembers.filter(m => !m.parentId);
    rootMembers.forEach(root => treeContainer.appendChild(buildNodeHTML(root)));
}

function buildNodeHTML(member) {
    const wrapper = document.createElement('div');
    wrapper.className = 'mb-2';
    
    const imageDisplay = member.imageUrl 
        ? `<img src="${member.imageUrl}" alt="${member.name}" class="w-12 h-12 rounded-full object-cover border-2 border-green-200">`
        : `<div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border-2 border-green-200 text-lg">${member.name.charAt(0)}</div>`;

    const card = document.createElement('div');
    card.className = 'inline-block bg-white border border-gray-200 rounded-lg p-3 shadow-sm min-w-[280px]';
    card.innerHTML = `
        <div class="flex items-start">
            <div class="flex-shrink-0 mr-3 mt-1">${imageDisplay}</div>
            <div>
                <div class="font-semibold text-gray-800">${member.name}</div>
                <div class="text-xs text-green-600 font-medium mb-1">${member.relation}</div>
                ${member.location ? `<div class="text-xs text-gray-500">📍 ${member.location}</div>` : ''}
                ${member.phone ? `<div class="text-xs text-gray-500">📞 ${member.phone}</div>` : ''}
                <button onclick="deleteMember('${member.id}')" class="text-red-400 text-xs mt-2 hover:text-red-600 underline">ลบข้อมูล</button>
            </div>
        </div>`;
    wrapper.appendChild(card);

    const children = familyMembers.filter(m => m.parentId === member.id);
    if (children.length > 0) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'ml-6 border-l-2 border-gray-200 pl-4 mt-2 space-y-2';
        children.forEach(child => {
            const childNode = buildNodeHTML(child);
            childNode.className += ' relative';
            const line = document.createElement('div');
            line.className = 'absolute -left-4 top-6 w-4 h-0.5 bg-gray-200';
            childNode.insertBefore(line, childNode.firstChild);
            childrenContainer.appendChild(childNode);
        });
        wrapper.appendChild(childrenContainer);
    }
    return wrapper;
}

window.deleteMember = function(id) {
    if(confirm('ต้องการลบข้อมูลนี้ใช่หรือไม่?')) {
        familyMembers.forEach(m => { if (m.parentId === id) m.parentId = null; });
        familyMembers = familyMembers.filter(m => m.id !== id);
        saveData();
        updateSelectDropdown();
        renderTree();
    }
}
