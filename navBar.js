export default function navBar (navState, showNewTask) {
    const allBtn = document.querySelector('.all-list-btn')
    const pendingBtn = document.querySelector('.pending-list-btn')
    const completeBtn = document.querySelector('.complete-list')


    allBtn.addEventListener('click', () => {
        removeEffect()
        allBtn.classList.add('checked')
        allBtn.classList.add('blue')
        navState[0].state = true
        showNewTask()
        // console.log(navState)
    })
    pendingBtn.addEventListener('click', () => {
        removeEffect()
        pendingBtn.classList.add('checked')
        pendingBtn.classList.add('blue')
        navState[1].state = true
        showNewTask()
        // console.log(navState)
    })
    completeBtn.addEventListener('click', () => {
        removeEffect()
        completeBtn.classList.add('checked')
        completeBtn.classList.add('blue')
        navState[2].state = true
        showNewTask()
        // console.log(navState)
    })

    function removeEffect() {
        allBtn.classList.remove('checked')
        pendingBtn.classList.remove('checked')
        completeBtn.classList.remove('checked')

        allBtn.classList.remove('blue')
        pendingBtn.classList.remove('blue')
        completeBtn.classList.remove('blue')

        navState.forEach(state => state.state = false)
    }
}