import fs from "fs/promises";
import path from "path";
import inquirer from "inquirer";

const CategoriesFile = "./public/api/categories/index.json";
const TypeFilesPath = "./public/api/types/";

(async () => {
    const answerData = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Title:",
        },
        {
            type: "input",
            name: "description",
            message: "Description:",
        },
    ]);
    const saved = await fs.readFile(CategoriesFile);
    const currentCategories = JSON.parse(saved).categories;
    const number = currentCategories.length;
    const id = `category_${number}`;
    const data = {
        id,
        title: answerData.title,
        description: answerData.description,
    };
    const categoryTypesFile = path.join(TypeFilesPath, `${data.id}.json`);
    const categories = [...currentCategories, data];
    fs.writeFile(
        CategoriesFile,
        JSON.stringify({
            categories,
        })
    );
    fs.writeFile(
        categoryTypesFile,
        JSON.stringify({
            types: [],
        })
    );
})();
