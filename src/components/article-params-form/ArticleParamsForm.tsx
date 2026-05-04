import clsx from 'clsx';
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
	OptionType,
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
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(currentArticleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Закрытие сайдбара при клике вне
	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onChange: setIsSidebarOpen,
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

	// Обработчик изменения полей формы
	const handleChange = (field: keyof ArticleStateType) => (option: OptionType) => {
		setFormState((prev) => ({ ...prev, [field]: option }));
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
			<aside className={clsx(styles.container, { [styles.container_open]: isSidebarOpen })} ref={sidebarRef}>
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
						onChange={handleChange('fontFamilyOption')}
					/>

					{/* Размер шрифта */}
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>

					{/* Цвет шрифта */}
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					{/* Цвет фона */}
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>

					{/* Ширина контента */}
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};