export const onFilterChange = (filter) => {
    document.querySelectorAll('.filter').forEach((element) => element.classList.remove('active'))
    document.querySelector(`.show-${filter}`).classList.add('active')
}

export const filtersInit = (onChange) => {
    document.querySelector('.view-parameters').addEventListener('click', (event) => {
        const className = event.target.classList.value.split(' ').find((className => className.includes('show')))
        const filterType = className?.split('-')?.[1]
        if(filterType){
            onFilterChange(filterType)
            onChange(filterType)
        }
    })
}