-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-11-14 23:21:21
-- 伺服器版本： 10.4.22-MariaDB
-- PHP 版本： 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `fortest`
--

-- --------------------------------------------------------

--
-- 資料表結構 `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `comments`
--

INSERT INTO `comments` (`id`, `title`, `content`, `createdAt`, `updatedAt`, `user_id`) VALUES
(2, '123123123', '123123', '2023-11-08 10:21:24', '2023-11-08 10:44:32', 15),
(3, '123', '123', '2023-11-08 10:21:25', '2023-11-08 10:21:25', 15),
(4, '123123', '123', '2023-11-08 18:58:26', '2023-11-08 18:58:26', 15),
(5, 'test123', '123123', '2023-11-08 18:59:13', '2023-11-08 18:59:13', 15),
(6, 'test', '234234234', '2023-11-08 19:08:17', '2023-11-08 19:08:17', 15),
(7, '123wff', '123fdfwef', '2023-11-08 19:09:06', '2023-11-08 19:09:06', 15),
(8, 'testtest123', '123123', '2023-11-08 19:09:59', '2023-11-08 19:09:59', 15),
(9, '123123', '12312313', '2023-11-08 19:10:11', '2023-11-08 19:10:11', 15),
(10, '12312312', '3123123', '2023-11-08 19:10:15', '2023-11-08 19:10:15', 15),
(11, '123123', '123123', '2023-11-08 19:10:32', '2023-11-08 19:10:32', 6),
(12, '123123', '123123', '2023-11-08 19:12:19', '2023-11-08 19:12:19', 15),
(13, '123', 'fefefef', '2023-11-08 19:27:21', '2023-11-08 19:27:21', 15),
(14, '123123fff', '123123ffff', '2023-11-08 19:30:03', '2023-11-08 19:30:03', 15),
(15, '123123fff', '231232', '2023-11-09 10:19:07', '2023-11-09 10:19:07', 15),
(16, 'fff', '2312', '2023-11-09 10:19:26', '2023-11-09 10:19:26', 15),
(17, '123123', '12313', '2023-11-09 10:20:30', '2023-11-09 10:20:30', 15),
(18, '333', '3333', '2023-11-09 10:20:34', '2023-11-09 10:20:34', 15),
(19, '12313333323', '123wwww123', '2023-11-09 10:21:39', '2023-11-09 10:21:39', 6),
(20, '3123', '2323', '2023-11-09 10:24:54', '2023-11-09 10:24:54', 15);

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `account` varchar(10) NOT NULL,
  `intro` varchar(255) DEFAULT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`id`, `account`, `intro`, `password`, `email`, `createdAt`, `updatedAt`) VALUES
(6, '123', '123123', '$2y$10$YZ.bJtmF5YiHGY3JfG0pBeB0TJ2WxhiHrL2UK0DnCsgy8n6jRXSYm', 'te%23@example.com', '2023-11-01 11:53:05', '2023-11-09 06:42:33'),
(7, '12333', NULL, '$2y$10$O3zUM3dvxbd9CFFukXcjQ.DJVYQUdyJZiAER4jqKVz13.HwxhlplK', 'te123123@example.com', '2023-11-01 13:00:49', '2023-11-01 13:00:49'),
(9, 'test123', NULL, '$2y$10$7whdyYe9Ls7kYUzAl6k7qeo3nfIu.iH0UJpB.KUgyP63tuGJVOEdO', 'test123123@example.com', '2023-11-02 13:31:34', '2023-11-02 13:31:34'),
(10, '123test123', NULL, '$2y$10$KUKRL32h0MdvJ95/pyfbLujduDsqmex1dNwiC21ua.vC4fwYWCBdW', '123test@example.com', '2023-11-04 06:56:32', '2023-11-04 06:56:32'),
(11, '123te1st', NULL, '$2y$10$BeOsWzsGvENV9T5xLTakbuMdp.AY8.j8ElNi0X2raK5mhqqxQ1NYa', 't123est123123@example.com', '2023-11-04 07:02:25', '2023-11-04 07:02:25'),
(13, 'tes123t', NULL, '$2y$10$jKTNULH4EIPkMwuxwZLXg.YSFNa4byD7hfociUYwiHmlA3vYbXgvG', 'te123st@example.com', '2023-11-07 06:34:15', '2023-11-07 06:34:15'),
(14, '123123', NULL, '$2y$10$sW4077fy95Tm8Ewvo0TNJe3kajVNlBnco2aDFO9YqIfy1EMFCnMsC', '123123@example.com', '2023-11-07 15:20:11', '2023-11-07 15:20:11'),
(15, 'test', '123123123123', '$2y$10$YZ.bJtmF5YiHGY3JfG0pBeB0TJ2WxhiHrL2UK0DnCsgy8n6jRXSYm', 'test@example.com', '2023-11-08 01:13:53', '2023-11-09 06:42:38'),
(16, '112323123', NULL, '$2y$10$di01HMYp/tnbjm.c4gN7iuyY.8PHbZxJjkJzKdrZLyKctJ67ZI.qq', '1233333@example.com', '2023-11-08 19:29:51', '2023-11-08 19:29:51'),
(17, '213', NULL, '$2y$10$YZ.bJtmF5YiHGY3JfG0pBeB0TJ2WxhiHrL2UK0DnCsgy8n6jRXSYm', '213@example.com', '2023-11-09 06:42:10', '2023-11-09 06:42:10');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
