import api from "./axios";
import {
  Faq,
  FaqApiResponse,
  HeroSlide,
  HomeArrayMission,
  Message,
  MessageApiItem,
  MessageApiResponse,
  NewsApiResponse,
  NewsItem,
  NoticeApiItem,
  NoticeApiResponse,
} from "./types";
import defaultNoticeImg from "@/public/notice.png";
// ── Donbosco Data ──
export async function getHeroSlides(): Promise<HeroSlide[]> {
  const data = await api.get("/heros");
  return data.data.data;
}
function transformToMessage(item: MessageApiItem): Message {
  return {
    id: item.id,
    title: item.title,
    content: item.content,
    staff_name: item["staff-name"],
    designation: item.designation,
    image: item.image || undefined,
    date: item.date || undefined,
    tenure: item.tenure || undefined,
  };
}
export async function getMessages(schoolId: number): Promise<Message[]> {
  const endpoint = `/messages/${schoolId}`;
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  try {
    const response = await api.get<MessageApiResponse>(endpoint);
    const msgs = response.data.data;
    console.log(`[fetchMessages] ✅ Fetched ${msgs} messages from ${fullUrl}`);
    return msgs?.map(transformToMessage) ?? [];
  } catch (error: any) {
    console.error(`[fetchMessages] ❌ Failed to fetch from ${fullUrl}`);
    if (error.response) {
      console.error(
        `[fetchMessages] HTTP Error ${error.response.status}: ${error.response.statusText}`,
      );
    } else if (error.request) {
      console.error(`[fetchMessages] Network Error: No response received`);
    } else {
      console.error(`[fetchMessages] Error:`, error.message);
    }
    return [];
  }
}

export async function getHomeMission(): Promise<HomeArrayMission> {
  const data = await api.get("/homemissions");
  return data.data;
}

function transformNoticeApiToNotice(
  apiNotices: NoticeApiItem[],
): NoticeApiItem[] {
  // Consider notices from the last 7 days as "new"
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return (
    apiNotices?.map((item) => {
      // Try to parse the date safely
      let noticeDate = new Date(item.date);
      if (isNaN(noticeDate.getTime())) {
        // Handle "16 Feb, 2026" format manually if needed, or fallback
        noticeDate = new Date();
      }

      const isNew = noticeDate > sevenDaysAgo;

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image, // Map image from API
        attachment: item.attachment,
        priority: item.priority,
        date: item.date,
        catagory: "Notice",
        slug: item.slug,
        isNew,
      };
    }) ?? []
  );
}

export async function fetchCNINotices(): Promise<NoticeApiResponse> {
  try {
    const url = "/notices";

    const response = await api.get<NoticeApiResponse>(url);

    return {
      data: transformNoticeApiToNotice(response.data.data),
      total: response.data.total,
      per_page: response.data.per_page,
      current_page: response.data.current_page,
      last_page: response.data.last_page,
      start: response.data.start,
      offset: response.data.offset,
      count: response.data.count,
    };
  } catch (error: any) {
    console.error("[fetchCNINotices] Failed:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return {
      data: [],
      total: 0,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      start: 1,
      offset: 0,
      count: 0,
    };
  }
}
export async function getNotices() {
  const data = await fetchCNINotices();
  return data?.data?.map((item) => ({
    ...item,
    image: item.image || defaultNoticeImg,
  }));
}

// ── News & Notices ──
export async function getNews() {
  const data = await fetchCNINews();
  return data;
}

function transformNewsApiToNewsItem(apiNews: NewsItem[]) {
  return (
    apiNews?.map((item) => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      content: item.content,
      image: item.image,
      date: item.date,
      category: "News",
      slug: item.slug,
    })) ?? []
  );
}

export async function fetchCNINews(): Promise<any> {
  try {
    const url = "/news";
    const response = await api.get<NewsApiResponse>(url);
    return {
      data: transformNewsApiToNewsItem(response.data.data),
      total: response.data.total,
      per_page: response.data.per_page,
      current_page: response.data.current_page,
      last_page: response.data.last_page,
      start: response.data.start,
      offset: response.data.offset,
      count: response.data.count,
    };
  } catch (error: any) {
    console.error("[fetchCNINews] Failed:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return {
      data: [],
      total: 0,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      start: 1,
      offset: 0,
      count: 0,
    };
  }
}

export async function getFaqs(organizationId: number = 1): Promise<Faq[]> {
   const endpoint = `/faqs/${organizationId}`;
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  try {
    const response = await api.get<FaqApiResponse>(endpoint);

    return response.data.data;
  } catch (error: any) {
    console.error(`[fetchFaqs] ❌ Failed to fetch FAQs from ${fullUrl}`);

    if (error.response) {
      // Server responded with error status
      console.error(
        `[fetchFaqs] HTTP Error ${error.response.status}: ${error.response.statusText}`,
      );
      console.error(`[fetchFaqs] Response data:`, error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error(`[fetchFaqs] Network Error: No response received`);
      console.error(`[fetchFaqs] Request details:`, error.request);
    } else {
      // Something else happened
      console.error(`[fetchFaqs] Error:`, error.message);
    }

    return [];
  }
}
