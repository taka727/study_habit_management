export function setActive(selectMenu: string) {
    // 同じナビゲーション内の他のアクティブクラスを削除
    const clickedElement = document.querySelector(`.${selectMenu}`);

    if (!clickedElement) return;
    // const nav = clickedElement.closest('nav');
    // if (!nav) return;
    // const allLinks = nav.querySelectorAll('a');
    // allLinks.forEach(link => link.classList.remove('active'));

    // // クリックされた要素にアクティブクラスを追加
    // clickedElement.classList.add('active');

    // // クリック効果
    // clickedElement.style.transform = 'scale(0.95)';
    // setTimeout(() => {
    //     clickedElement.style.transform = '';
    // }, 150);
}

// ページロード時のアニメーション
document.addEventListener('DOMContentLoaded', function () {
    const navs = document.querySelectorAll('nav');
    navs.forEach((nav, index) => {
        nav.style.opacity = '0';
        nav.style.transform = 'translateY(30px)';
        setTimeout(() => {
            nav.style.transition = 'all 0.6s ease';
            nav.style.opacity = '1';
            nav.style.transform = 'translateY(0)';
        }, index * 200);
    });
});