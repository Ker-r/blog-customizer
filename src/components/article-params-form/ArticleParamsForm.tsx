import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	onApply,
}: ArticleParamsFormProps) => {
	// Открыт ли сайдбар
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(currentArticleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Закрытие сайдбара при клике вне
	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onChange: setIsOpen,
	});

	// Обработчик отправки формы (кнопка «Применить»)
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState); // Применяем настройки из формы к статье
	};

	// Обработчик сброса формы (кнопка «Сбросить»)
	const handleReset = () => {
		setFormState(defaultArticleState); // Сбрасываем форму на дефолтные
		onApply(defaultArticleState); // Применяем дефолтные настройки к статье
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			{isOpen && (
				<aside
					className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
					ref={sidebarRef}>
					<form
						className={styles.form}
						onSubmit={handleSubmit}
						onReset={handleReset}>
						<Text size={31} weight={800} uppercase align='center'>
							Задайте параметры
						</Text>

						{/* Шрифт */}
						<Select
							title='Шрифт'
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) =>
								setFormState({ ...formState, fontFamilyOption: option })
							}
						/>

						{/* Размер шрифта */}
						<RadioGroup
							title='Размер шрифта'
							name='fontSize'
							selected={formState.fontSizeOption}
							options={fontSizeOptions}
							onChange={(option) =>
								setFormState({ ...formState, fontSizeOption: option })
							}
						/>

						{/* Цвет шрифта */}
						<Select
							title='Цвет шрифта'
							selected={formState.fontColor}
							options={fontColors}
							onChange={(option) =>
								setFormState({ ...formState, fontColor: option })
							}
						/>
						<Separator />
						{/* Цвет фона */}
						<Select
							title='Цвет фона'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={(option) =>
								setFormState({ ...formState, backgroundColor: option })
							}
						/>

						{/* Ширина контента */}
						<Select
							title='Ширина контента'
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={(option) =>
								setFormState({ ...formState, contentWidth: option })
							}
						/>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};