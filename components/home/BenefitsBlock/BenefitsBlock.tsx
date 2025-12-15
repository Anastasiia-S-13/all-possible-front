import styles from "../../../app/page.module.css";
import css from "./BenefitsBlock.module.css";

export default function BenefitsBlock() {
    return (
        <section className={styles.section}>
            <div className={css.descBlock}>
                <h2 className={css.titleBenefits}>ToolNext — платформа для швидкої та зручної оренди інструментів</h2>
                <p className={css.titleDescription}>ToolNext допомагає знайти потрібний інструмент у декілька кліків.
                    Користувачі можуть легко орендувати обладнання для ремонту чи хобі, а власники — зручно керувати своїми оголошеннями.
                    Ми створили сервіс, щоб зробити процес оренди простим, доступним і вигідним для всіх.</p>
            </div>
            <ul className={css.benefitsList}>
                <li className={css.benefitsItem}>
                    <svg className={css.icon} width="48" height="48">
                        <use href="/sprite/sprite.svg#icon-service_toolbox" />
                    </svg>
                    <h3 className={css.itemTitle}>Легкий доступ до інструментів</h3>
                    <p className={css.itemDesc}>Знаходьте потрібний інструмент у своєму районі без зайвих дзвінків і пошуків. Просто введіть назву — і отримайте варіанти поруч із вами.</p>
                </li>
                <li className={css.benefitsItem}>
                    <svg className={css.icon} width="48" height="48">
                        <use href="/sprite/sprite.svg#icon-checkbook" />
                    </svg>
                    <h3 className={css.itemTitle}>Швидке бронювання</h3>
                    <p className={css.itemDesc}>Бронюйте інструменти в кілька кліків. Жодних складних форм чи довгих очікувань — тільки простий та зручний процес.</p>
                </li>
                <li className={css.benefitsItem}>
                    <svg className={css.icon} width="48" height="48">
                        <use href="/sprite/sprite.svg#icon-manage_accounts" />
                    </svg>
                    <h3 className={css.itemTitle}>Зручне управління</h3>
                    <p className={css.itemDesc}>Додавайте свої інструменти в каталог, редагуйте оголошення та контролюйте оренду. ToolNext допомагає перетворити зайві інструменти на додатковий дохід.</p>
                </li>
            </ul>
        </section>
    );
}