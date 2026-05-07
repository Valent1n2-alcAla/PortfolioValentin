<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20250507000001 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Création de la table contact';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('
            CREATE TABLE contact (
                id          INT AUTO_INCREMENT NOT NULL,
                name        VARCHAR(100)  NOT NULL,
                email       VARCHAR(180)  NOT NULL,
                subject     VARCHAR(255)  NOT NULL,
                message     LONGTEXT      NOT NULL,
                created_at  DATETIME      NOT NULL COMMENT \'(DC2Type:datetime_immutable)\',
                PRIMARY KEY (id)
            ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        ');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE contact');
    }
}
