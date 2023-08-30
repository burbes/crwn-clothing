import './category-item.styles.scss'

const CategoryItem = ( {category} ) => {
    const { title, imageUrl } = category;
    return (
        <div className="category-container">
            <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }} />
            <div className="category-body-container">
                <h2>{title}</h2>
                <p>Shop now</p>
            </div>
        </div>
    )
}


// const CategoryItem = ({ title, imageUrl, size }) => (
//     <div className={`${size} category-item`}>
//         <div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
//         <div className="content">
//             <h1 className="title">{title.toUpperCase()}</h1>
//             <span className="subtitle">SHOP NOW</span>
//         </div>
//     </div>
// )

export default CategoryItem;